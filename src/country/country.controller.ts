import { Body, Controller, Get, Post, HttpException, Param, Put, UseInterceptors, UploadedFile, Delete } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOkResponse, ApiBody, ApiTags } from '@nestjs/swagger';

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
  @UseInterceptors(FileInterceptor('file'))
  @ApiOkResponse({ description: 'Return created country', type: CountryDTO })
  async create(@UploadedFile() file, @Body() body: CreateCountryDTO): Promise<CountryDTO> {
    console.log(file);
    console.log(body);
    let result
    try {
      result = await this.countriesService.create(file);
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
  @ApiBody({ description: 'Edit country', type: EditCountryDTO })
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

  @Delete(':id')
  @ApiOkResponse({ description: 'Return deleted country' })
  async delete(@Param('id') id: string): Promise<string> {
    let result
    try {
      result = await this.countriesService.delete(id)
    } catch (e) {
      throw new HttpException({...e}, e.statusCode)             
    }
    return result
  }

}