import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PlacesService } from './place.service';
import { PlacesController } from './place.controller';

import { Place, PlaceSchema } from './schemas/place.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Place.name, schema: PlaceSchema }])
  ],
  controllers: [PlacesController],
  providers: [PlacesService],
  exports: [PlacesService]
})

export class PlaceModule {}
