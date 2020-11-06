import { Body, Controller, Get, Post, HttpException, Param, Put, Delete } from '@nestjs/common'
import { ApiOkResponse, ApiBody, ApiTags, ApiBearerAuth } from '@nestjs/swagger'
import { ToursService } from './tour.service'

import { CreateTourDTO, EditTourDTO } from './dto/input.dto'
import { TourDTO } from './dto/output.dto'

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

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<string> {
    let result
    try {
      result = await this.toursService.delete(id)
    } catch (e) {
      throw new HttpException({...e}, e.statusCode)
    }
    return result
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Return tour by id', type: TourDTO })
  async findById(@Param('id') id: string): Promise<TourDTO> {
    let result
    try {
      result = this.toursService.findById(id)
    } catch (e) {
      throw new HttpException({...e}, e.statusCode)
    }
    return result
  }

  @Get()
  @ApiOkResponse({ description: 'Return all tour', type: [TourDTO] })
  async getAll(): Promise<TourDTO[]> {
    let result
    try {
      result = this.toursService.getAll()
    } catch (e) {
      throw new HttpException({...e}, e.statusCode)
    }
    return result
  }

  @Put(':id')
  @ApiBody({ description: 'Edit country', type: EditTourDTO })
  @ApiOkResponse({ description: 'Return edited country', type: TourDTO })
  async edit(@Param('id') id: string, @Body() body: EditTourDTO): Promise<TourDTO> {
    let result
    let payload = body
    try {
      result = await this.toursService.edit(id, payload)
    } catch (e) {
      throw new HttpException({...e}, e.statusCode)             
    }
    return result
  }
}
