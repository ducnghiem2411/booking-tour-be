import { Body, Controller, Get, Post, HttpException, Param, Put, Delete, UseInterceptors, UploadedFile, Req, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiBody, ApiTags, ApiConsumes, ApiBearerAuth } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express'

import { UserGuard } from '../auth/auth.guard';
import { PlacesService } from './place.service';

import { apiBodyPlace } from './schemas/api-doc.schema'
import { CreatePlaceDTO, EditPlaceDTO } from './dto/input.dto';
import { PlaceDTO } from './dto/output.dto'
import { async } from 'rxjs';
@ApiTags('Places')
@Controller('places')
export class PlacesController {
  constructor(
    private readonly placesService: PlacesService
  ) {}
  
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ schema: apiBodyPlace })
  @ApiOkResponse({ description: 'Return created place', type: CreatePlaceDTO })
  async create(@UploadedFile() file, @Req() req, @Body() body: CreatePlaceDTO): Promise<CreatePlaceDTO> {
    let result
    let payload = { ...body, image: "" }
    if (file) {
      const host = req.get('host')
      const imageUrl = `http://${host}/upload/${file.filename}`
      payload.image = imageUrl
    }
    try {
        result = await this.placesService.create(payload);
    } catch (e) {
        throw new HttpException({...e}, e.statusCode)
    }
    return result
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ schema: apiBodyPlace })
  @ApiOkResponse({ description: 'Return edited place', type: PlaceDTO })
  async edit(@UploadedFile() file, @Req() req, @Param('id') id: string, @Body() body: EditPlaceDTO): Promise<PlaceDTO> {
    let result
    let payload = { ...body }
    if (file) {
      const host = req.get('host')
      const imageUrl = `http://${host}/upload/${file.filename}`
      payload.image = imageUrl
    }
    try {
      result = await this.placesService.edit(id, payload)
    } catch (e) {
      throw new HttpException({...e}, e.statusCode)
    }
    return result
  }

  @Get()
  // @ApiBearerAuth()
  // @UseGuards(UserGuard)
  @ApiOkResponse({ description: 'Return all place', type: [PlaceDTO] })
  async getAll(): Promise<PlaceDTO[]> {
    let result
    try {
      result = await this.placesService.getAll()
    } catch (e) {
      throw new HttpException({...e}, e.statusCode)
    }
    return result
  }

  @Get(':countryId')
  @ApiOkResponse({ description: 'Return places by country id'})
  async getPlaceByCountryId(@Param('countryId') id: string): Promise<PlaceDTO[]> {
      let result
      try {
        result = await this.placesService.getPlaceByCountryId(id)
      } catch (e) {
        throw new HttpException({...e}, e.statusCode)
      }
      return result
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Return deleted place' })
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