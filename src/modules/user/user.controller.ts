import { Body, Controller, Get, Post, HttpException, Param, Req, Put, Res, UseInterceptors, UploadedFile } from '@nestjs/common'
import { ApiOkResponse, ApiBody, ApiTags, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger'
import { FileInterceptor } from '@nestjs/platform-express'
import { UsersService } from './user.service'

import { GetUserDTO, LoggedInDTO } from './dto/output.dto'
import { LoginDTO, CreateUserDTO, ResetPasswordDTO, ChangePasswordDTO, EditUserDTO, LoginWithGoogleDTO } from './dto/input.dto'
import { bodyEditUser } from './schemas/api-doc.schema'

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  
  @Post()
  @ApiOkResponse({ description: 'Return created user', type: CreateUserDTO })
  async create(@Req() req, @Body() body: CreateUserDTO): Promise<GetUserDTO> {
    let result
    const host = req.get('host')
    try {
      result = await this.usersService.create(body, host)
    } catch (e) {
      throw new HttpException({...e}, e.statusCode)
    }
    return result
  }

  @Post('/login/google')
  @ApiOkResponse({})
  async loginWithGoogle(@Body() body: LoginWithGoogleDTO): Promise<GetUserDTO> {
    let result
    try {
      result = await this.usersService.loginWithGoogle(body)
    } catch (e) {
      throw new HttpException({...e}, e.statusCode)
    }
    return result
  }

  @Get('registration/confirmation/:token')
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
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ schema: bodyEditUser })
  @ApiOkResponse({ description: 'Return user profile', type: LoggedInDTO })
  async edit(@UploadedFile() file, @Req() req, @Body() body: EditUserDTO): Promise<LoggedInDTO> {
    let result
    const token = req.headers.authorization.split(' ')[1]
    if (file) {
      const host = req.get('host')
      const imageUrl = `http://${host}/upload/${file.filename}`
      body.image = imageUrl
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
  @ApiOkResponse({ description: 'Return user', type: LoggedInDTO })
  async findByToken(@Param('token') token: string): Promise<LoggedInDTO> {
    let result
    try {
      result = this.usersService.findByToken(token);
    } catch (e) {
      throw new HttpException({...e}, e.statusCode)
    }
    return result
  }
}
