import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';

import { Model } from 'mongoose';
import { User } from './schemas/user.schema';

import { GetUserDTO } from './dto/output.dto';
import { LoginDTO, CreateUserDTO } from './dto/input.dto';


@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async create(body: CreateUserDTO): Promise<User> {
    const user = new this.userModel(body);
    user.save();
    return user;
  }

  async findById(id: String): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    console.log(user)
    return user
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({email: email}).exec()
  }

  async login(loginDTO: LoginDTO): Promise<string> {
    const user = await this.validateUser(loginDTO)

    if(user) {
      const token = this.generateToken(user.email)
      return token
    }
    return 'false'
  }

  async validateUser(loginDTO: LoginDTO): Promise<GetUserDTO> {
    const { email, password } = loginDTO 
    const user = await this.findByEmail(email);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async generateToken(userEmail: string) {
    const payload = { email: userEmail };
    const token = this.jwtService.sign(payload)
    return token
  }

}
