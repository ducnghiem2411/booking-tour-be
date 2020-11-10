import { Injectable, BadRequestException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { Model } from 'mongoose'
import { Booking } from './schemas/booking.schema'

// import { CountryDTO } from './dto/output.dto'
// import { CreateCountryDTO, EditCountryDTO } from './dto/input.dto'

@Injectable()
export class BookingService {
  constructor(
    @InjectModel(Booking.name) private readonly bookingModel: Model<Booking>,
  ) {}

  async create (payload) {

  }
}