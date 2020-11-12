import { Body, Controller, Get, Post, HttpException, Param, Put, UseInterceptors, UploadedFile, Delete, Req, UseGuards, Query } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiOkResponse, ApiBody, ApiTags, ApiConsumes, ApiBearerAuth } from '@nestjs/swagger'

import { UserGuard, AdminGuard } from 'src/modules/auth/auth.guard';
import { CountriesService } from './country.service'

import { bodyCreateCountry, bodyEditCountry } from './schemas/api-doc.schema'
import { CreateCountryDTO, EditCountryDTO } from './dto/input.dto'
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
  @ApiBody({ schema: bodyCreateCountry })
  @ApiOkResponse({ description: 'Return created country', type: CountryDTO })
  async create(@UploadedFile() file, @Req() req, @Body() body: CreateCountryDTO): Promise<CountryDTO> {
    let result
    let payload = { ...body, image: "" }
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
  // @ApiBearerAuth()
  // @UseGuards(AdminGuard)
  @ApiOkResponse({ description: 'Return all country', type: [CountryDTO] })
  async getAll(): Promise<CountryDTO[]> {
    let result
    try {
      result = await this.countriesService.getAll()
    } catch (e) {
      throw new HttpException({...e}, e.statusCode)
    }
    return result
  }

  
  @Get('/top-destination')
  @ApiOkResponse({ description: 'Return top destination' })
  async getTopDestination(@Query('total') total: number): Promise<CountryDTO[]> {
    console.log('total', total);
    let result
    try {
      result = await this.countriesService.getTopDestination()
    } catch (e) {
      console.log(e)
      throw new HttpException({...e}, e.statusCode)
    }
    return result
  }
  
  @Get(':id')
  @ApiOkResponse({ description: 'Return country by id', type: CountryDTO })
  async getById(@Param('id') id: string): Promise<CountryDTO> {
    let result
    try {
      result = await this.countriesService.getById(id)
    } catch (e) {
      throw new HttpException({...e}, e.statusCode)
    }
    return result
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('image'))
  @ApiBody({ schema: bodyEditCountry })
  @ApiConsumes('multipart/form-data')
  @ApiOkResponse({ description: 'Return edited country', type: CountryDTO })
  async edit(@UploadedFile() file, @Req() req, @Param('id') id: string, @Body() body: EditCountryDTO): Promise<CountryDTO> {
    let result
    let payload = { ...body }
    if (file) {
      const host = req.get('host')
      const imageUrl = `http://${host}/upload/${file.filename}`
      payload.image = imageUrl
    }
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