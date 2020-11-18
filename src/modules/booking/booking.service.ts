import { Injectable, BadRequestException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { Model } from 'mongoose'
import { Booking } from './schemas/booking.schema'

import { BookingDTO } from './dto/input.dto'

@Injectable()
export class BookingService {
  constructor(
    @InjectModel(Booking.name) private readonly bookingModel: Model<Booking>,
  ) {}

  async create (user, payload: BookingDTO): Promise<any> {
    const userBooking = await this.bookingModel.findOne({ username: user.username, tourId: payload.tourId })
    if (userBooking) {
      throw new BadRequestException('You already booked this tour')
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
      return 'place was deleted'
    }
    throw new BadRequestException('Id not match')
  }

}