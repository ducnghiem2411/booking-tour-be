import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CountriesService } from './country.service';
import { CountriesController } from './country.controller';

import { Country, CountrySchema } from './schemas/country.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
        { name: Country.name, schema: CountrySchema },
    ]),
  ],
  controllers: [CountriesController],
  providers: [CountriesService],
  exports: [CountriesService]
})

export class CountriesModule {}
