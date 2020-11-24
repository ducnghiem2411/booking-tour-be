import { Injectable, BadRequestException, InternalServerErrorException, ForbiddenException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { generate } from 'generate-password'

import { sendMail } from 'src/shared/mailer'
import { TokenService } from '../token/token.service'

import { Model } from 'mongoose'
import { User } from './schemas/user.schema'

import { LoginDTO, CreateUserDTO, ChangePasswordDTO, ResetPasswordDTO } from './dto/input.dto'
import { GetUserDTO, LoggedInDTO } from './dto/output.dto'
import { forgetPasswordMail, forgetPasswordResponseMail, createAccountMail } from './constant';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly tokenService: TokenService,
  ) {}

  async create(body: CreateUserDTO): Promise<User> {
    const user = await this.userModel.findOne({ 
      $or: [{ email: body.email }, { username: body.username }]
    })
    if (user) {
      throw new BadRequestException('Username or email is already used')
    }
    else {
      const registerMail = await sendMail(createAccountMail(body.email, body.username))
      if (registerMail) {
        const newUser = new this.userModel(body)
        await newUser.save()
        return newUser
      }
    }
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
    if (user) {
      const payload = { email: user.email, username: user.username }
      const token = await this.tokenService.generateToken(payload)
      return { accessToken: token, username: user.username, email: user.email }
    }
    throw new BadRequestException('Email or password not match')
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
    console.log('email', payload);
    const token = await this.tokenService.generateToken({ email: payload.email }, 60*5)
    const user = await this.userModel.findOneAndUpdate({ email: payload.email }, { resetPasswordToken: token })
    console.log('user', user);
    if (user) {
      //token expired in 5 minutes
      const url = `http://${host}/users/reset/password/${token}`
      const confirmResetPasswordMail = await sendMail(forgetPasswordMail(user.email, url))
      if (confirmResetPasswordMail) {
        return 'Check your email'
      }
    }
    return 'Account does not existed'
  }

  async forgetPasswordResponse(token: string): Promise<any> {
    // const payload = await this.tokenService.getPayload(token)
    // console.log('payload', payload);
    const user = await this.userModel.findOneAndUpdate(
      { resetPasswordToken: token }, 
      { password: generate({length: 10, numbers: true}) }, 
      { new: true }
    )
    if (user) {
      const newPasswordMail = await sendMail(forgetPasswordResponseMail(user.email, user.password))
      console.log('newPasswordMail', newPasswordMail);
      return 'Reset password successfully'
    }
    throw new InternalServerErrorException()
  }

}
