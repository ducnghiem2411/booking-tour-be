import { Injectable, BadGatewayException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { TokenService } from '../token/token.service';

import { Model } from 'mongoose';
import { User } from './schemas/user.schema';

import { LoginDTO, CreateUserDTO } from './dto/input.dto';


@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly tokenService: TokenService
  ) {}

  async create(body: CreateUserDTO): Promise<User> {
    const user = await this.userModel.find()
    .where({ username: body.username })
    .where({ email: body.email })
    console.log(user)
    if (user) {
      throw new BadGatewayException('User existed')
    }
    const newUser = new this.userModel(body);
    await newUser.save();
    return newUser;
  }

  async findById(id: String): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    return user
  }

  async login(loginDTO: LoginDTO): Promise<string> {
    const user = await this.userModel.findOne(loginDTO).select(['-password'])
    console.log(user)
    if(user) {
      const payload = { email: user.email }
      console.log('payload', payload);
      const token = this.tokenService.generateToken(payload)
      return token
    }
    return 'Invalid username or password'
  }

}
