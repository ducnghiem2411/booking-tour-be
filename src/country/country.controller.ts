import { Body, Controller, Get, Post, HttpException, Param, Request, Put } from '@nestjs/common';
import { ApiOkResponse, ApiBody, ApiTags, ApiBearerAuth } from '@nestjs/swagger';

import { CountriesService } from './country.service';

import { CreateCountryDTO, EditCountryDTO } from './dto/input.dto';
import { CountryDTO } from './dto/output.dto'

@ApiTags('Countries')
@Controller('countries')
export class CountriesController {
  constructor(
    private readonly countriesService: CountriesService
  ) {}
  
  @Post()
  @ApiOkResponse({ description: 'Return created country', type: CountryDTO })
  async create(@Body() body: CreateCountryDTO): Promise<CountryDTO> {
    let result
    try {
      result = await this.countriesService.create(body);
    } catch (e) {
      throw new HttpException({...e}, e.statusCode)
    }
    return result
  }

  @Get()
  @ApiOkResponse({ description: 'Return edited country', type: [CountryDTO] })
  async getAll(): Promise<CountryDTO[]> {
    let result
    try {
      result = await this.countriesService.getAll()
    } catch (e) {
      throw new HttpException({...e}, e.statusCode)       
    }
    return result
  }

  @Put(':id')
  @ApiBody({ description: 'Edit customer profile', type: EditCountryDTO })
  @ApiOkResponse({ description: 'Return edited country', type: CountryDTO })
  async edit(@Param('id') id: string, @Body() body: EditCountryDTO): Promise<CountryDTO> {
    let result
    let payload = body
    try {
      result = await this.countriesService.edit(id, payload)
    } catch (e) {
      throw new HttpException({...e}, e.statusCode)             
    }
    return result
  }

}