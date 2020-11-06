import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { Place } from './schemas/place.schema';

import { PlaceDTO } from './dto/output.dto';
import { EditPlaceDTO, CreatePlaceDTO } from './dto/input.dto';

@Injectable()
export class PlacesService {
  constructor(
    @InjectModel(Place.name) private readonly placeModel: Model<Place>,
  ) {}

  async create(payload: CreatePlaceDTO): Promise<PlaceDTO> {
    const place = new this.placeModel(payload);
    await place.save();
    return place;
  }

  async getAll(): Promise<PlaceDTO[]> {
    // -pagination
    return await this.placeModel.find()
  }

  async edit(id: string, payload: EditPlaceDTO): Promise<string> {
    const place = await this.placeModel.findById(id)
    if (place) {
      await place.updateOne(payload)
      return 'edit place successfully'
    }
    return 'no place matched'
  }

  async delete(id: string): Promise<string> {
    const place = await this.placeModel.deleteOne({ _id: id })
    if(place.deletedCount !== 0) {
      return 'place was deleted'
    }
    return 'no place matched'
  }

}