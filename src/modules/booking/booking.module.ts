import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { AuthModule } from "../auth/auth.module";
import { TokenModule } from "../token/token.module";
import { BookingController } from "./booking.controller";
import { BookingService } from "./booking.service";

import { Booking, BookingSchema } from "./schemas/booking.schema";
import { ToursModule } from "../tour/tour.module";
import { Tour, TourSchema } from "../tour/schemas/tour.schema";
@Module({
    imports: [
      MongooseModule.forFeature([
        { name: Booking.name, schema: BookingSchema }, 
        { name: Tour.name, schema: TourSchema }
      ]),
      AuthModule,
      TokenModule,
      ToursModule
    ],
    controllers: [BookingController],
    providers: [BookingService]
})

export class BookingModule {}