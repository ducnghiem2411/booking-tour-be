import { Body, Controller, Get, Post, HttpException, Param, Req, Put } from '@nestjs/common'
import { ApiOkResponse, ApiBody, ApiTags, ApiBearerAuth } from '@nestjs/swagger'
import { UsersService } from './user.service'

import { GetUserDTO, LoggedInDTO } from './dto/output.dto'
import { LoginDTO, CreateUserDTO, ResetPasswordDTO, ChangePasswordDTO } from './dto/input.dto'

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
  async login(@Body() body: LoginDTO): Promise<LoggedInDTO> {
    let result
    try {
      result = await this.usersService.login(body)
    } catch (e) {
      throw new HttpException({...e}, e.statusCode)
    }
    return result
  }

  @Put('password')
  @ApiBearerAuth()
  async changePassword(@Body() body: ChangePasswordDTO, @Req() req): Promise<any> {
    let result
    const token = req.headers.authorization.split(' ')[1]
    try {
      result = await this.usersService.changePassword(body, token)
    } catch (e) {
      throw new HttpException({...e}, e.statusCode)
    }
    return result
  }

  @Post('password/reset')
  async forgetPassword(@Req() req, @Body() body: ResetPasswordDTO): Promise<any> {
    const host = req.get('host')
    let result
    try {
      result = await this.usersService.forgetPassword(body, host)
    } catch (e) {
      throw new HttpException({...e}, e.statusCode)
    }
    return result
  }

  @Get('password/reset/:token')
  async resetPasswordResponse(@Param('token')token: string): Promise<string> {
    let result
    try {
      result = await this.usersService.forgetPasswordResponse(token)
    } catch (e) {
      throw new HttpException({...e}, e.statusCode)
    }
    return result
  }

  @Get()
  @ApiOkResponse({ description: 'Return all user', type: [GetUserDTO] })
  async getAll(): Promise<GetUserDTO[]> {
    let result
    try {
      result = this.usersService.findAll()
    } catch (e) {
      throw new HttpException({...e}, e.statusCode)
    }
    return result
  }

  @Get('update-login')
  @ApiBearerAuth()
  async updateLogin(@Req() req) {
    let result
    const token = req.headers.authorization.split(' ')[1]
    try {
      result = await this.usersService.updateLogin(token)
    } catch (e) {
      throw new HttpException({...e}, e.statusCode)
    }
    return result
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Return user', type: GetUserDTO })
  async findById(@Param('id') id: string): Promise<GetUserDTO> {
    let result
    try {
      result = this.usersService.findById(id);
    } catch (e) {
      throw new HttpException({...e}, e.statusCode)
    }
    return result
  }
}
