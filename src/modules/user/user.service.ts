import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { TokenService } from '../token/token.service';

import { Model } from 'mongoose';
import { User } from './schemas/user.schema';

import { LoginDTO, CreateUserDTO } from './dto/input.dto';
import { GetUserDTO, LoggedInDTO } from './dto/output.dto';


@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly tokenService: TokenService
  ) {}

  async create(body: CreateUserDTO): Promise<User> {
    const user = await this.userModel.findOne({$or: [{email: body.email}, {username: body.username}]})
    if (user) {
      throw new BadRequestException('Username or email is already used')
    }
    const newUser = new this.userModel(body);
    await newUser.save();
    return newUser;
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
    if(user) {
      const payload = { email: user.email, username: user.username }
      const token = await this.tokenService.generateToken(payload)
      return { accessToken: token, username: user.username, email: user.email }
    }
    throw new BadRequestException('Invalid username or password')
  }

  async updateLogin(token): Promise<LoggedInDTO> {
    const payload = await this.tokenService.getPayload(token)
    const { iat, exp, ...newPayload } = payload
    const newToken = await this.tokenService.generateToken(newPayload)
    return { accessToken: newToken, username: payload.username, email: payload.email }
  }

}
