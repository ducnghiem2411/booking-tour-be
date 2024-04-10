import { Injectable, BadRequestException, ForbiddenException, UnauthorizedException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { generate } from 'generate-password'

import { sendMail } from 'src/shared/mailer'
import { TokenService } from '../token/token.service'

import { Model } from 'mongoose'
import { User } from './schemas/user.schema'

import { LoginDTO, CreateUserDTO, ChangePasswordDTO, ResetPasswordDTO, EditUserDTO, LoginWithGoogleDTO } from './dto/input.dto'
import { GetUserDTO, LoggedInDTO } from './dto/output.dto'

import { confirmCreateAccountMail } from './mail-content/confirm-create-account'
import { confirmResetPasswordMail } from './mail-content/confirm-reset-password'
import { resetPasswordResponseMail } from './mail-content/reset-password-done'
import { MSG } from 'src/shared/message'

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly tokenService: TokenService,
  ) {}

  withoutUnexpectedFields = ['-activeAccountToken', '-password', '-resetPasswordToken']

  async create(body: CreateUserDTO, host): Promise<string> {
    const user = await this.userModel.findOne({ $or: [{ email: body.email }, { username: body.username }]})
    if (user) { throw new BadRequestException(MSG.USERINFO_EXISTED) }
    else {
      const token = await this.tokenService.generateToken({ email: body.email })
      const url = `http://${host}/users/registration/confirmation/${token}`
      const registerMail = await sendMail(confirmCreateAccountMail(body.email, body.username, url))
      if (registerMail) {
        const newUser = new this.userModel({ ...body, activeAccountToken: token })
        await newUser.save()
        return MSG.CONFIRM_ACTIVE
      }
    }
  }

  async activeAccount(token: string): Promise<Boolean> {
    const payload = await this.tokenService.getPayload(token)
    const user = await this.userModel.findOneAndUpdate(
      { activeAccountToken: token, email: payload.email },
      { isActive: true }
    )
    if (user) {
      if (user.isActive === true) { 
        // throw new BadRequestException(MSG.ACTIVATED) 
        return true
      }
      return true
    }
    return false
  }

  async findByToken(token: String): Promise<GetUserDTO> {
    const payload = await this.tokenService.getPayload(token)
    const user = await this.userModel.findOne({ email: payload.email }).select(this.withoutUnexpectedFields)
    return user
  }

  async findAll(): Promise<GetUserDTO[]> {
    return await this.userModel.find().select(this.withoutUnexpectedFields)
  }

  async login(loginDTO: LoginDTO): Promise<LoggedInDTO> {
    const user = await this.userModel.findOne(loginDTO).select(this.withoutUnexpectedFields)
    if (!user) { throw new BadRequestException(MSG.EMAIL_PASSWORD_NOT_MATCH) }
    if (user && user.isActive === false) {
      throw new BadRequestException(MSG.ACTIVE_REQUIRED)
    }
    const payload = { email: user.email, username: user.username }
    const token = await this.tokenService.generateToken(payload)
    return { ...user.toJSON(), accessToken: token }
  }


  async loginWithGoogle (body: LoginWithGoogleDTO): Promise<GetUserDTO> {
    //change me later
    const user = this.userModel.findOne({ email: body.email})
    if (!user) {
      const token = this.tokenService.generateToken({ email: body.email })
      const newUser = new this.userModel({ ...body, activeAccountToken: token })
    }
    return
  }

  async updateLogin(token): Promise<LoggedInDTO> {
    const payload = await this.tokenService.getPayload(token)
    const { iat, exp, ...newPayload } = payload
    const newToken = await this.tokenService.generateToken(newPayload)
    const user = await this.userModel
      .findOne({username: payload.username, email: payload.email, isActive: true })
      .select(this.withoutUnexpectedFields)
    return { ...user.toJSON(), accessToken: newToken }
  }

  async edit(token: string, body: EditUserDTO): Promise<GetUserDTO> {
    const payload = await this.tokenService.getPayload(token)
    if (!payload) { throw new UnauthorizedException() }
    const user = await this.userModel.findOneAndUpdate({ email: payload.email }, { ...body }, { new: true })
    return user
  }

  async changePassword(body: ChangePasswordDTO, token) {
    const payload = await this.tokenService.getPayload(token)
    if (!payload) { throw new UnauthorizedException() }
    const user = await this.userModel.findOneAndUpdate(
      { password: body.oldPassword, email: payload.email },
      { password: body.newPassword }
    )
    if (user) { return MSG.PASSWORD_CHANGED_SUCCESS }
    throw new ForbiddenException(MSG.PASSWORD_NOT_MATCH)
  }

  async forgetPassword(payload: ResetPasswordDTO, host): Promise<string> {
    //token expired in 5 minutes
    const token = await this.tokenService.generateToken({ email: payload.email }, { expiresIn: 60*5 })
    const user = await this.userModel.findOneAndUpdate({ email: payload.email }, { resetPasswordToken: token })
    if (user) {
      const url = `http://${host}/users/password/reset/${token}`
      const resetPasswordMail = await sendMail(confirmResetPasswordMail(user.email, url))
      if (resetPasswordMail) {
        return MSG.CHECK_EMAIL_REQUIRED
      }
    }
    return MSG.USER_NOT_EXISTED
  }

  async forgetPasswordResponse(token: string): Promise<Boolean> {
    const payload = await this.tokenService.getPayload(token)
    if (!payload) { return false }
    const user = await this.userModel.findOneAndUpdate(
      { resetPasswordToken: token },
      { password: generate({length: 10, numbers: true}) },
      { new: true }
    )
    if (user) {
      await sendMail(resetPasswordResponseMail(user.email, user.username, user.password))
      await this.userModel.findOneAndUpdate({ resetPasswordToken: token }, { resetPasswordToken: '' })
      return true
    }
  }

}
