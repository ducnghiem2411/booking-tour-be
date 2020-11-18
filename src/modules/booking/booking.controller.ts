import { Body, Controller, Get, Post, HttpException, Param, Put, Delete, Req, UseGuards } from '@nestjs/common'
import { ApiOkResponse, ApiBody, ApiTags, ApiConsumes, ApiBearerAuth } from '@nestjs/swagger'

import { UserGuard, AdminGuard } from 'src/modules/auth/auth.guard'
import { BookingService } from './booking.service'

import { BookingDTO } from './dto/input.dto'
import { TokenService } from '../token/token.service'

@ApiTags('Booking')
@Controller('booking')
export class BookingController {
  constructor(
    private readonly bookingService: BookingService,
    private readonly tokenService: TokenService,
    ) {}
  
  @Post()
  @ApiBody({ type: BookingDTO })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Return booked tour' })
  async create(@Req() req, @Body() body: BookingDTO): Promise<any> {
    let result
    const token = req.headers.authorization.split(' ')[1]
    const user = await this.tokenService.getPayload(token)
    try {
      result = await this.bookingService.create(user, body);
    } catch (e) {
      throw new HttpException({...e}, e.statusCode)
    }
    return result
  }

  @Get()
  @ApiOkResponse({ description: 'Return all booked tour by each user' })
  async getAll() {
    let result
    try {
      result = await this.bookingService.getAll()
    } catch (e) {
      throw new HttpException({...e}, e.statusCode)
    }
    return result
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Delete booked tour' })
  async delete(@Param('id') id) {
    let result
    try {
      result = await this.bookingService.delete(id)
    } catch (e) {
      throw new HttpException({...e}, e.statusCode)
    }
    return result
  }

}