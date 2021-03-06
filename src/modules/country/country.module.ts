import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { MulterModule } from '@nestjs/platform-express'

import { imageFilter } from 'src/shared/file-filter'
import { fileStorage } from 'src/shared/file-storage'

import { AuthModule } from '../auth/auth.module'
import { TokenModule } from '../token/token.module'
import { CountriesController } from './country.controller'
import { CountriesService } from './country.service'

import { Country, CountrySchema } from './schemas/country.schema'
import { Place, PlaceSchema } from '../place/schemas/place.schema'
import { Tour, TourSchema } from '../tour/schemas/tour.schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Country.name, schema: CountrySchema },
      { name: Place.name, schema: PlaceSchema},
      { name: Tour.name, schema: TourSchema }
    ]),
    MulterModule.register({
      fileFilter: imageFilter,
      storage : fileStorage
    }),
    AuthModule,
    TokenModule
  ],
  controllers: [CountriesController],
  providers: [CountriesService],
  exports: [CountriesService]
})

export class CountriesModule {}
