import { Body, Controller, Get, Post, HttpException, Param, Request } from '@nestjs/common';
import { ApiOkResponse, ApiBody, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './user.service';

import { User } from './schemas/user.schema';

import { GetUserDTO } from './dto/output.dto';
import { LoginDTO, CreateUserDTO } from './dto/input.dto'

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOkResponse({ description: 'Return created user', type: CreateUserDTO })
  async create(@Body() body: CreateUserDTO): Promise<CreateUserDTO> {
    let result
    try {
        result = await this.usersService.create(body);
    } catch (e) {
        throw new HttpException({...e}, e.statusCode)
    }
    return result
  }

  @Post('login')
  async login(@Body() body: LoginDTO): Promise<string> {
      let result
      try {
          result = await this.usersService.login(body)
      } catch (e) {
        throw new HttpException({...e}, e.statusCode)
      }
      return result
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Return user', type: CreateUserDTO })
  async findById(@Param('id') id: string): Promise<User> {
    let result
    try {
        result = this.usersService.findById(id);
    } catch (e) {
        throw new HttpException({...e}, e.statusCode)
    }
    return result
  }
}
