import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { MulterModule } from '@nestjs/platform-express'

import { imageFilter } from 'src/shared/file-filter'
import { fileStorage } from 'src/shared/file-storage'

import { CountriesService } from './country.service'
import { CountriesController } from './country.controller'

import { Country, CountrySchema } from './schemas/country.schema'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Country.name, schema: CountrySchema }]),
    MulterModule.register({
      fileFilter: imageFilter,
      storage : fileStorage
    })
  ],
  controllers: [CountriesController],
  providers: [CountriesService],
  exports: [CountriesService]
})

export class CountriesModule {}
