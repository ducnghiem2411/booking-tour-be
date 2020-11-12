import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { MulterModule } from '@nestjs/platform-express'

import { imageFilter } from 'src/shared/file-filter'
import { fileStorage } from 'src/shared/file-storage'

import { ToursService } from './tour.service'
import { ToursController } from './tour.controller'

import { Tour, TourSchema } from './schemas/tour.schema'
import { Place, PlaceSchema } from '../place/schemas/place.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Tour.name, schema: TourSchema },
      { name: Place.name, schema: PlaceSchema }
    ]),
    MulterModule.register({
      fileFilter: imageFilter,
      storage : fileStorage,
      limits: { files: 4 }
    })
  ],
  controllers: [ToursController],
  providers: [ToursService],
  exports: [ToursService]
})
export class ToursModule {}
