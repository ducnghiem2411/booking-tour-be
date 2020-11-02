import { Body, Controller, Get, Post, HttpException, Param, Request, Delete } from '@nestjs/common'
import { ApiOkResponse, ApiBody, ApiTags, ApiBearerAuth } from '@nestjs/swagger'
import { ToursService } from './tour.service'

import { CreateTourDTO } from './dto/input.dto'
import { GetTour } from './dto/output.dto'

@ApiTags('Tours')
@Controller('tours')
export class ToursController {
  constructor(private readonly toursService: ToursService) {}

  @Post()
  @ApiOkResponse({ description: 'Return created tour', type: CreateTourDTO })
  async create(@Body() body: CreateTourDTO): Promise<CreateTourDTO> {
    let result
    try {
      result = await this.toursService.create(body)
    } catch (e) {
      throw new HttpException({...e}, e.statusCode)
    }
    return result
  }

  @Delete()
  async delete(): Promise<string> {
    let result
    try {
      result = await this.toursService.delete()
    } catch (e) {
      throw new HttpException({...e}, e.statusCode)
    }
    return result
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Return tour by id', type: GetTour })
  async findById(@Param('id') id: string): Promise<GetTour> {
    let result
    try {
      result = this.toursService.findById(id)
    } catch (e) {
      throw new HttpException({...e}, e.statusCode)
    }
    return result
  }
}
