import { Body, Controller, Get, Post, HttpException, Param, Request } from '@nestjs/common';
import { ApiOkResponse, ApiBody, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { PlacesService } from './place.service';
import { CreatePlaceDTO } from './dto/input.dto';

@ApiTags('Places')
@Controller('places')
export class CountriesController {
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


}