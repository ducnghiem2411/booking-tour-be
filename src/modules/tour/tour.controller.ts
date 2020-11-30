import { Body, Controller, Get, Post, HttpException, Param, Put, Delete, UseInterceptors, UploadedFiles, Req, Query, Res } from '@nestjs/common'
import { ApiOkResponse, ApiBody, ApiTags, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger'
import { FilesInterceptor } from '@nestjs/platform-express'

import { ToursService } from './tour.service'

import { CreateTourDTO, EditTourDTO, ListTourQuery, SubscribeDTO } from './dto/input.dto'
import { TourDTO } from './dto/output.dto'
import { bodyCreateTour, bodyEditTour } from './schemas/api-doc.schema'

@ApiTags('Tours')
@Controller('tours')
export class ToursController {
  constructor(private readonly toursService: ToursService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('images'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ schema: bodyCreateTour })
  @ApiOkResponse({ description: 'Return created tour', type: CreateTourDTO })
  async create(@UploadedFiles() files, @Req() req, @Body() body: CreateTourDTO): Promise<CreateTourDTO> {
    let result
    let payload = { ...body, images: [] }
    if (files && files.length) {
      const host = req.get('host')
      files.forEach(f => {
        payload.images.push(`http://${host}/upload/${f.filename}`)
      })
    }
    try {
      result = await this.toursService.create(payload)
    } catch (e) {
      throw new HttpException({...e}, e.statusCode)
    }
    return result
  }

  @Post('subscribe/registration')
  @ApiOkResponse({ description: 'Register subscribe' })
  async subscribe(@Body() body: SubscribeDTO, @Req() req): Promise<string> {
    let result
      const host = req.get('host')
    try {
      result = this.toursService.subscribe(body, host)
    } catch (e) {
      throw new HttpException({...e}, e.statusCode)
    }
    return result
  }
  
  @Get('subscribers/confirmation/:token')
  @ApiOkResponse({ description: 'Be used to active subscriber' })
  async subscribeResponse(@Param('token')token: string, @Res() res): Promise<Boolean> {
    let result
    try {
      result = await this.toursService.subscribeResponse(token)
      result === true
      ? res.send('Active account success')
      : res.send('Active account failed')
    } catch (e) {
      throw new HttpException({...e}, e.statusCode)
    }
    return result 
  }
  
  @Post('/subscribers/:tourId')
  @ApiOkResponse({ description: 'Send email to subscribers' })
  async sendToSubscribers(@Param() tourId: string): Promise<string> {
    let result
    try {
      result = this.toursService.sendToSubscribers(tourId)
    } catch (e) {
      throw new HttpException({...e}, e.statusCode)
    }
    return result
  }

  @Get()
  @ApiOkResponse({ description: 'Return all tour', type: [TourDTO] })
  async getAll(@Query() options: ListTourQuery): Promise<TourDTO[]> {
    let result
    try {
      result = this.toursService.getAll(options)
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

  @Put(':id')
  @ApiBody({ description: 'Edit tour', schema: bodyEditTour })
  @ApiOkResponse({ description: 'Return edited tour', type: TourDTO })
  async edit(@Param('id') id: string, @Body() body: EditTourDTO): Promise<TourDTO> {
    let result
    try {
      result = await this.toursService.edit(id, body)
    } catch (e) {
      throw new HttpException({...e}, e.statusCode)
    }
    return result
  }
  
  @Get('/place-id/:id')
  @ApiOkResponse({ description: 'Return tour by place id'})
  async getTourByPlaceId(@Param('id') placeId: string): Promise<any> {
    let result
    try {
      result = await this.toursService.getTourByPlaceId(placeId)
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

}
