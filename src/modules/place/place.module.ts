import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { MulterModule } from '@nestjs/platform-express'

import { imageFilter } from 'src/shared/file-filter'
import { fileStorage } from 'src/shared/file-storage'

import { PlacesService } from './place.service'
import { PlacesController } from './place.controller'

import { Place, PlaceSchema } from './schemas/place.schema'
import { Country, CountrySchema } from '../country/schemas/country.schema';
import { AuthModule } from '../auth/auth.module';
import { TokenModule } from '../token/token.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Place.name, schema: PlaceSchema },
      { name: Country.name, schema: CountrySchema }
    ]),
    MulterModule.register({
      fileFilter: imageFilter,
      storage : fileStorage
    }),
    AuthModule,
    TokenModule
  ],
  controllers: [PlacesController],
  providers: [PlacesService],
  exports: [PlacesService]
})

export class PlacesModule {}
