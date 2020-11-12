import { Injectable, BadRequestException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { Model } from 'mongoose'
import { Booking } from './schemas/booking.schema'
import { Tour } from '../tour/schemas/tour.schema';

// import { CountryDTO } from './dto/output.dto'
// import { CreateCountryDTO, EditCountryDTO } from './dto/input.dto'

@Injectable()
export class BookingService {
  constructor(
    @InjectModel(Booking.name) private readonly bookingModel: Model<Booking>,
    @InjectModel(Tour.name) private readonly tourModel: Model<Tour>
  ) {}

  async create (payload) {

    return
  }

  async getAll () {
    return await this.bookingModel.find()
  }

  async edit () {

  }

  async delete () {

  }

}