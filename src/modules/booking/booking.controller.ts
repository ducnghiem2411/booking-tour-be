import { Body, Controller, Get, Post, HttpException, Param, Put, Delete, Req, UseGuards } from '@nestjs/common'
import { ApiOkResponse, ApiBody, ApiTags, ApiConsumes, ApiBearerAuth } from '@nestjs/swagger'

import { UserGuard, AdminGuard } from 'src/modules/auth/auth.guard';
import { BookingService } from './booking.service'

import { BookingDTO } from './dto/input.dto'
// import { CountryDTO } from './dto/output.dto'

@ApiTags('Booking')
@Controller('booking')
export class BookingController {
  constructor(
    private readonly bookingService: BookingService
    ) {}
  
  @Post()
  @ApiBody({})
  @ApiOkResponse({ description: 'Return booked tour' })
  async create(@Req() req, @Body() body: BookingDTO): Promise<any> {
    let result
    let payload = body
    try {
      result = await this.bookingService.create(payload);
    } catch (e) {
      throw new HttpException({...e}, e.statusCode)
    }
    return result
  }

  @Get()
  @ApiBody({})
  async getAll() {
    let result
    try {
      result = await this.bookingService.getAll()
    } catch (e) {
      throw new HttpException({...e}, e.statusCode)
    }
    return result
  }
  
  @Put()
  @ApiBody({})
  async edit() {
    let result
    try {
      result = await this.bookingService.edit()
    } catch (e) {
      throw new HttpException({...e}, e.statusCode)
    }
    return result
  }

  @Delete(':id')
  @ApiBody({})
  async delete() {
    let result
    try {
      result = await this.bookingService.delete()
    } catch (e) {
      throw new HttpException({...e}, e.statusCode)
    }
    return result
  }

}