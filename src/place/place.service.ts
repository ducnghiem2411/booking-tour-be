import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { Place } from './schemas/place.schema';

@Injectable()
export class PlacesService {
  constructor(
    @InjectModel(Place.name) private readonly placeModel: Model<Place>,
  ) {}

  async create(payload) {
    const place = new this.placeModel(payload);
    await place.save();
    return place;
  }

  async getAll() {
    // -pagination
    return await this.placeModel.find()
  }

  async edit(id, payload) {
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