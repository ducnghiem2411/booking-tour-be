import { Injectable, BadRequestException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { Model } from 'mongoose'
import { Tour } from './schemas/tour.schema'

import { CreateTourDTO, EditTourDTO, ListTourQuery } from './dto/input.dto'
import { TourDTO } from './dto/output.dto'
import { Place } from '../place/schemas/place.schema'

import { isEmpty, pickBy, identity } from 'lodash'

@Injectable()
export class ToursService {
  constructor(
    @InjectModel(Tour.name) private readonly tourModel: Model<Tour>,
    @InjectModel(Place.name) private readonly placeModel: Model<Place>
  ) {}

  async create(payload: CreateTourDTO): Promise<TourDTO> {
    const place = await this.placeModel.findOne({ _id: payload.placeId, name: payload.place })
    if (!place) {
      throw new BadRequestException('Place id or name does not match')
    }
    payload.checkIn = new Date(payload.checkIn)
    payload.checkOut = new Date(payload.checkOut)
    const tour = new this.tourModel(payload)
    await tour.save()
    return tour
  }

  async getAll(options: ListTourQuery): Promise<any> {
    if (isEmpty(options)) {
      return await this.tourModel.find()
    }
    if (options.limit && options.page) {
      const limit = Number(options.limit)
      const page = Number(options.page) 
      const tours = await this.tourModel.find()
      .sort('checkIn')
      .skip(limit*page - limit)
      .limit(limit)
      .exec()
      const total = await this.tourModel.find().estimatedDocumentCount().exec()
      return { totalTour: total, page: page, perPage: limit, tours: [...tours] }
    }

    const filter = {
      // country: options.country,
      // place: options.place,
      // price: {
      //   $gte: options.minprice || 0,
      //   $lte: options.maxprice || 9999999999
      // },
      checkIn: { $gte: options.checkin || new Date('1000-01-01') },
      checkOut: { $lte: options.checkout || new Date('9999-01-01') },
      // member: { $gte: Number(options.member) || 0 }
    }
    console.log(filter);
    const result = await this.tourModel
    .find({...filter})
    .sort({ name: 'asc' })
    .exec()
    return result
  }

  async getTourByPlaceId(id: string): Promise<TourDTO[]> {
    return await this.tourModel.find({ placeId: id })
  }

  async delete(id: string): Promise<string> {
    const tour = await this.tourModel.deleteOne({ _id: id })
    if (tour.deletedCount !== 0) {
      return 'tour was deleted'
    }
    return 'no tour matched'
  }

  async findById(id: string): Promise<TourDTO> {
    return await this.tourModel.findById(id)
  }

  async edit(id: string, payload: EditTourDTO): Promise<string> {
    const editedTour = await this.tourModel.findByIdAndUpdate(id, payload, {new: true})
    if (!editedTour) {
      throw new BadRequestException('Id not match')
    }
    return editedTour 
  }

}