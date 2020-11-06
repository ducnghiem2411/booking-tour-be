import { Body, Controller, Get, Post, HttpException, Param, Put, UseInterceptors, UploadedFile, Delete, Req, Res } from '@nestjs/common';
import { FileInterceptor, MulterOptionsFactory } from '@nestjs/platform-express';
import { ApiOkResponse, ApiBody, ApiTags, ApiConsumes } from '@nestjs/swagger';

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
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
        },
        description: {
          type: 'string'
        },
        image: {
          type: 'string',
          format: 'binary',
        }
      },
    },
  })
  @ApiOkResponse({ description: 'Return created country', type: CountryDTO })
  async create(@UploadedFile() file, @Req() req, @Body() body: CreateCountryDTO): Promise<CountryDTO> {
    let result
    let payload = { name: body.name,  description: body.description, image: "" }
    if (file) {
      const host = req.get('host')
      const imageUrl = `http://${host}/upload/${file.filename}`
      payload.image = imageUrl
    }
    try {
      result = await this.countriesService.create(payload);
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


// storage: MulterGoogleStorage.storageEngine({
//   projectId: 'booking-tour-project',
//   keyFilename: path.join(__dirname, '../booking-tour-project.json'),
//   bucket: 'booking-tour-project.appspot.com',
//   filename: (req, file, cb) => {
//     const fileNameSplit = file.originalname.split('.')
//     const fileExt = fileNameSplit[fileNameSplit.length - 1]
//     cb(null, `${Date.now()}.${fileExt}`)
//   }
// })