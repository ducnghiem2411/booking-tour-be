import { Injectable, BadRequestException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { Model } from 'mongoose'
import { Booking } from '../booking/schemas/booking.schema'
import { Review } from './schemas/review.schema'

import { ReviewDTO } from './dto/output.dto'
import { CreateReviewDTO } from './dto/input.dto'
import { MSG } from 'src/shared/message'

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Booking.name) private readonly bookingModel: Model<Booking>,
    @InjectModel(Review.name) private readonly reviewModel: Model<Review>
  ) {}

  async create(user, payload: CreateReviewDTO): Promise<ReviewDTO> {
    const booking = await this.bookingModel.findOne({ username: user.username, tourId: payload.tourId })
    if (booking) {
      const review = await this.reviewModel.findOne({ username: user.username, tourId: payload.tourId })
      if (review) {
        throw new BadRequestException()
      }
      const newReview = new this.reviewModel({ username: user.username, ...payload })
      await newReview.save()
      return newReview
    }
    throw new BadRequestException(MSG.BOOK_REQUIRED)
  }

  async getReviewByPlace(id): Promise<ReviewDTO[]> {
    return await this.reviewModel.find({ placeId: id })
  }

  async delete(id: string): Promise<string> {
    const reviewToDelete =  await this.reviewModel.findOneAndDelete(id)
    if (reviewToDelete) {
      return MSG.RESOURCE_DELETED_SUCCESS
    }
    throw new BadRequestException(MSG.ID_NOT_MATCH)
  }

  async deleteAll() {
    return await this.reviewModel.deleteMany()
  }

  async getRandom(): Promise<ReviewDTO[]> {
    return await this.reviewModel.find()
  }

}