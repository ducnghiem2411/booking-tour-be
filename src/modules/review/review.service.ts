import { Injectable, BadRequestException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { Model } from 'mongoose'
import { Country } from '../country/schemas/country.schema'
import { Place } from '../place/schemas/place.schema'
import { Tour } from '../tour/schemas/tour.schema'
import { Booking } from '../booking/schemas/booking.schema'
import { Review } from './schemas/review.schema'

import { ReviewDTO } from './dto/output.dto'
import { CreateReviewDTO } from './dto/input.dto'

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Booking.name) private readonly bookingModel: Model<Booking>,
    @InjectModel(Review.name) private readonly reviewModel: Model<Review>
  ) {}

  async create(user, payload: CreateReviewDTO): Promise<ReviewDTO> {
    const booking = this.bookingModel.findOne({ username: user.username, tourId: payload.tourId })
    console.log('payload', payload);
    if (booking) {
      const newReview = new this.reviewModel({ username: user.username, ...payload })
      await newReview.save()
      return newReview
    }
    throw new BadRequestException('You have to book this tour to review')
  }

  async getAll(): Promise<ReviewDTO[]> {
    // -pagination
    return
  }

  async delete(id: string): Promise<string> {
    return
  }

}