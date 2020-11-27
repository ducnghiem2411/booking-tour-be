import { Body, Controller, Get, Post, HttpException, Param, Req, Put, Res, UseInterceptors, UploadedFile } from '@nestjs/common'
import { ApiOkResponse, ApiBody, ApiTags, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger'
import { UsersService } from './user.service'

import { GetUserDTO, LoggedInDTO } from './dto/output.dto'
import { LoginDTO, CreateUserDTO, ResetPasswordDTO, ChangePasswordDTO, EditUserDTO } from './dto/input.dto'
import { FileInterceptor } from '@nestjs/platform-express';
import { file } from '@babel/types';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  
  @Post()
  @ApiOkResponse({ description: 'Return created user', type: CreateUserDTO })
  async create(@Req() req, @Body() body: CreateUserDTO): Promise<CreateUserDTO> {
    let result
    const host = req.get('host')
    try {
      result = await this.usersService.create(body, host)
    } catch (e) {
      throw new HttpException({...e}, e.statusCode)
    }
    return result
  }

  // @Get('')
  // @ApiOkResponse({})
  // async loginWithFacebook() {
  //   let result
  //   try {
  //     result = await this.usersService.loginWithFacebook()
  //   } catch (e) {
  //     throw new HttpException({...e}, e.statusCode)
  //   }
  //   return result
  // }

  @Get('registration/confirm/:token')
  @ApiOkResponse({ description: 'Be used to active account' })
  async activeAccount(@Param('token')token: string, @Res() res): Promise<any> {
    let result
    try {
      result = await this.usersService.activeAccount(token)
      result === true
      ? res.sendFile('activeAccountSuccess.html', { root: 'static' })
      : res.send('Active account failed')
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

  @Put('profile/:username')
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  async edit(@UploadedFile() file, @Body() body: EditUserDTO, @Req() req): Promise<GetUserDTO> {
    let result
    const token = req.headers.authorization.split(' ')[1]
    if (file) {
      const host = req.get('host')
      const imageUrl = `http://${host}/upload/${file.filename}`
      body.avatar = imageUrl
    }
    try {
      result = await this.usersService.edit(token, body)
    } catch (e) {
      throw new HttpException({...e}, e.statusCode)
    }
    return result
  }

  @Put('password/:username')
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
  async resetPasswordResponse(@Param('token')token: string, @Res() res): Promise<string> {
    let result
    try {
      result = await this.usersService.forgetPasswordResponse(token)
      console.log('result', result)
      result === true
      ? res.sendFile('resetPasswordSuccess.html', { root: 'static' })
      : res.sendFile('resetPasswordFailed.html', { root: 'static' })
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

  @Get(':token')
  @ApiOkResponse({ description: 'Return user', type: GetUserDTO })
  async findByToken(@Param('token') token: string): Promise<GetUserDTO> {
    let result
    try {
      result = this.usersService.findByToken(token);
    } catch (e) {
      throw new HttpException({...e}, e.statusCode)
    }
    return result
  }
}
