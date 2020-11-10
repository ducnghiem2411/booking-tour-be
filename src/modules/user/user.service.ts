import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { User } from './schemas/user.schema';

import { GetUserDTO } from './dto/output.dto';
import { LoginDTO, CreateUserDTO } from './dto/input.dto';

import { TokenService } from '../token/token.service';
import { log } from 'util';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly tokenService: TokenService
  ) {}

  async create(body: CreateUserDTO): Promise<User> {
    const user = new this.userModel(body);
    user.save();
    return user;
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
    return 'false'
  }

}
