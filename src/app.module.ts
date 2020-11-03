import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express'
import { MongooseModule } from '@nestjs/mongoose';

import { UsersModule } from './user/user.module';
import { ToursModule } from './tour/tour.module';
import { PlaceModule } from './place/place.module';
import { CountriesModule } from './country/country.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://nghiemld:pBooktour123@cluster0.txwil.mongodb.net/BookTour?retryWrites=true&w=majority`
    ),
    MulterModule.register({
      dest: 'upload',
    }),
    UsersModule,
    ToursModule,
    PlaceModule,
    CountriesModule,
  ]
})

export class AppModule {}
