import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { AuthModule } from '../auth/auth.module'
import { TokenModule } from '../token/token.module'
import { BookingModule } from '../booking/booking.module';
import { ReviewController } from './review.controller'
import { ReviewService } from './review.service'

import { Booking, BookingSchema } from '../booking/schemas/booking.schema'
import { Review, ReviewSchema } from './schemas/review.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Booking.name, schema: BookingSchema },
      { name: Review.name, schema: ReviewSchema }
    ]),
    AuthModule,
    TokenModule,
    BookingModule,
  ],
  controllers: [ReviewController],
  providers: [ReviewService],
})

export class ReviewModule {}
