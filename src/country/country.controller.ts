import { Body, Controller, Get, Post, HttpException, Param, Request } from '@nestjs/common';
import { ApiOkResponse, ApiBody, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { CountriesService } from './country.service';
import { CreateCountryDTO } from './dto/input.dto';

@ApiTags('Countries')
@Controller('countries')
export class CountriesController {
  constructor(
    private readonly countriesService: CountriesService
  ) {}
  
  @Post()
  @ApiOkResponse({ description: 'Return created user', type: CreateCountryDTO })
  async create(@Body() body: CreateCountryDTO): Promise<CreateCountryDTO> {
    let result
    try {
      result = await this.countriesService.create(body);
    } catch (e) {
      throw new HttpException({...e}, e.statusCode)
    }
    return result
  }

  @Get()
  @ApiOkResponse({})
  async getAll() {
    let result
    try {
      result = await this.countriesService.getAll()
    } catch (e) {
      throw new HttpException({...e}, e.statusCode)       
    }
    return result
  }

}