import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersModule } from './modules/user/user.module';
import { ToursModule } from './modules/tour/tour.module';
import { PlacesModule } from './modules/place/place.module';
import { CountriesModule } from './modules/country/country.module';
import { FileModule } from './modules/file/file.module';
import { BookingModule } from './modules/booking/booking.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://nghiemld:pBooktour123@cluster0.txwil.mongodb.net/BookTour?retryWrites=true&w=majority`
    ),
    UsersModule,
    ToursModule,
    PlacesModule,
    CountriesModule,
    FileModule,
    BookingModule
  ]
})

export class AppModule {}
