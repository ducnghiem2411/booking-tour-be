import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PlacesService } from './place.service';
import { CountriesController } from './place.controller';

import { Place, PlaceSchema } from './schemas/place.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Place.name, schema: PlaceSchema }])
  ],
  controllers: [CountriesController],
  providers: [PlacesService],
  exports: [PlacesService]
})

export class PlaceModule {}
