import { Injectable, BadRequestException, InternalServerErrorException, ForbiddenException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { generate } from 'generate-password'

import { sendMail } from 'src/shared/mailer'
import { TokenService } from '../token/token.service'

import { Model } from 'mongoose'
import { User } from './schemas/user.schema'

import { LoginDTO, CreateUserDTO, ChangePasswordDTO, ResetPasswordDTO } from './dto/input.dto'
import { GetUserDTO, LoggedInDTO } from './dto/output.dto'

import { confirmCreateAccountMail } from './mail-content/confirm-create-account'
import { confirmResetPasswordMail } from './mail-content/confirm-reset-password'
import { resetPasswordResponseMail } from './mail-content/reset-password-done'

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly tokenService: TokenService,
  ) {}

  async create(body: CreateUserDTO, host): Promise<GetUserDTO> {
    const user = await this.userModel.findOne({ 
      $or: [{ email: body.email }, { username: body.username }]
    })
    if (user) {
      throw new BadRequestException('Username or email is already used')
    }
    else {
      const token = await this.tokenService.generateToken({ email: body.email })
      const url = `http://${host}/users/registration/confirm/${token}`
      const registerMail = await sendMail(confirmCreateAccountMail(body.email, body.username, url))
      if (registerMail) {
        const newUser = new this.userModel({ ...body, activeAccountToken: token })
        await newUser.save()
        return { username: newUser.username, email: newUser.email }
      }
    }
  }

  async activeAccount(token: string): Promise<Boolean> {
    const payload = await this.tokenService.getPayload(token)
    const user = await this.userModel.findOneAndUpdate(
      { activeAccountToken: token, email: payload.email },
      { isActive: true }
    )
    console.log('user', user);
    if (user) {
      if (user.isActive === true) {
        throw new BadRequestException('Your account has been active already')
      }
      return true
    }
    return false
  }

  async findById(id: String): Promise<GetUserDTO> {
    const user = await this.userModel.findById(id).select(['-password'])
    return user
  }

  async findAll(): Promise<GetUserDTO[]> {
    return await this.userModel.find().select(['-password'])
  }

  async login(loginDTO: LoginDTO): Promise<LoggedInDTO> {
    const user = await this.userModel.findOne(loginDTO).select(['-password'])
    if (!user) {
      throw new BadRequestException('Email or password not match')
    }
    if (user && user.isActive === false) {
      throw new BadRequestException('Please active your account first')
    }
    else if (user) {
      const payload = { email: user.email, username: user.username }
      const token = await this.tokenService.generateToken(payload)
      return { accessToken: token, username: user.username, email: user.email }
    }
  }

  async updateLogin(token): Promise<LoggedInDTO> {
    const payload = await this.tokenService.getPayload(token)
    const { iat, exp, ...newPayload } = payload
    const newToken = await this.tokenService.generateToken(newPayload)
    return { accessToken: newToken, username: payload.username, email: payload.email }
  }

  async changePassword(body: ChangePasswordDTO, token) {
    const payload = await this.tokenService.getPayload(token)
    const user = await this.userModel.findOneAndUpdate(
      { password: body.oldPassword, email: payload.email }, 
      { password: body.newPassword }
    )
    if (user) {
      return 'Change password successfully'
    }
    throw new ForbiddenException('Password not match')
  }

  async forgetPassword(payload: ResetPasswordDTO, host): Promise<string> {
    //token expired in 5 minutes
    const token = await this.tokenService.generateToken({ email: payload.email }, { expiresIn: 60*5 })
    const user = await this.userModel.findOneAndUpdate({ email: payload.email }, { resetPasswordToken: token })
    if (user) {
      const url = `http://${host}/users/password/reset/${token}`
      const resetPasswordMail = await sendMail(confirmResetPasswordMail(user.email, url))
      if (resetPasswordMail) {
        return 'Please check your email'
      }
    }
    return 'Account does not existed'
  }

  async forgetPasswordResponse(token: string): Promise<Boolean> {
    const payload = await this.tokenService.getPayload(token)
    if (payload!) {
      return false
    }
    const user = await this.userModel.findOneAndUpdate(
      { resetPasswordToken: token }, 
      { password: generate({length: 10, numbers: true}) }, 
      { new: true }
    )
    if (user) {
      await sendMail(resetPasswordResponseMail(user.email, user.username, user.password))
      await this.userModel.findOneAndUpdate(
        { resetPasswordToken: token }, 
        { resetPasswordToken: '' }, 
      )
      return true
    }
  }

}
