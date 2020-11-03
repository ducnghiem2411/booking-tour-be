import { Body, Controller, Get, Post, HttpException, Param, Put, Delete } from '@nestjs/common';
import { ApiOkResponse, ApiBody, ApiTags, ApiBearerAuth } from '@nestjs/swagger';

import { PlacesService } from './place.service';

import { CreatePlaceDTO, EditPlaceDTO } from './dto/input.dto';
import { PlaceDTO } from './dto/output.dto'
@ApiTags('Places')
@Controller('places')
export class PlacesController {
  constructor(
    private readonly placesService: PlacesService
  ) {}
  
  @Post()
  @ApiOkResponse({ description: 'Return created place', type: CreatePlaceDTO })
  async create(@Body() body: CreatePlaceDTO): Promise<CreatePlaceDTO> {
    let result
    try {
        result = await this.placesService.create(body);
    } catch (e) {
        throw new HttpException({...e}, e.statusCode)
    }
    return result
  }

  @Put(':id')
  @ApiBody({ description: 'Edit place', type: EditPlaceDTO })
  @ApiOkResponse({ description: 'Return edited place', type: PlaceDTO })
  async edit(@Param('id') id: string, @Body() body: EditPlaceDTO): Promise<PlaceDTO> {
    let result
    let payload = body
    try {
      result = await this.placesService.edit(id, payload)
    } catch (e) {
      throw new HttpException({...e}, e.statusCode)             
    }
    return result
  }

  @Get()
  @ApiOkResponse({ description: 'Return edited place', type: [PlaceDTO] })
  async getAll(): Promise<PlaceDTO[]> {
    let result
    try {
      result = await this.placesService.getAll()
    } catch (e) {
      throw new HttpException({...e}, e.statusCode)       
    }
    return result
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Return deleted country' })
  async delete(@Param('id') id: string): Promise<string> {
    let result
    try {
      result = await this.placesService.delete(id)
    } catch (e) {
      throw new HttpException({...e}, e.statusCode)             
    }
    return result
  }

}