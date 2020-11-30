import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { MulterModule } from '@nestjs/platform-express'

import { imageFilter } from 'src/shared/file-filter'
import { fileStorage } from 'src/shared/file-storage'

import { ToursService } from './tour.service'
import { ToursController } from './tour.controller'

import { Tour, TourSchema } from './schemas/tour.schema'
import { Place, PlaceSchema } from '../place/schemas/place.schema'
import { Subscriber, SubscriberSchema } from './schemas/subscriber.schema'
import { TokenModule } from '../token/token.module'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Tour.name, schema: TourSchema },
      { name: Place.name, schema: PlaceSchema },
      { name: Subscriber.name, schema: SubscriberSchema }
    ]),
    MulterModule.register({
      fileFilter: imageFilter,
      storage : fileStorage,
      limits: { files: 4 }
    }),
    TokenModule
  ],
  controllers: [ToursController],
  providers: [ToursService],
  exports: [ToursService]
})

export class ToursModule {}
