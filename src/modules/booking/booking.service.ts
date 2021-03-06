import { Injectable, BadRequestException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { Model } from 'mongoose'
import { Booking } from './schemas/booking.schema'

import { BookingDTO } from './dto/input.dto'
import { Tour } from '../tour/schemas/tour.schema';
import { MSG } from 'src/shared/message';

@Injectable()
export class BookingService {
  constructor(
    @InjectModel(Booking.name) private readonly bookingModel: Model<Booking>,
    @InjectModel(Tour.name) private readonly tourModel: Model<Tour>
  ) {}

  async create (user, payload: BookingDTO): Promise<any> {
    const tour = await this.tourModel.findById(payload.tourId)
    if (!tour) {
      throw new BadRequestException(MSG.TOUR_DOES_NOT_EXISTED)
    }
    const userBooking = await this.bookingModel.findOne({ username: user.username, tourId: payload.tourId })
    if (userBooking) {
      throw new BadRequestException()
    }
    const newUserBooking = new this.bookingModel({ username: user.username, ...payload })
    await newUserBooking.save()
    return newUserBooking
  }

  async getAll () {
    return await this.bookingModel.find()
  }

  async delete (id) {
    const booking = await this.bookingModel.findOneAndDelete({ _id: id })
    if(booking) {
      return MSG.RESOURCE_DELETED_SUCCESS
    }
    throw new BadRequestException(MSG.ID_NOT_MATCH)
  }

}