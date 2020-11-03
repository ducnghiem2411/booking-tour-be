import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { Tour } from './schemas/tour.schema';

import { CreateTourDTO } from './dto/input.dto';

@Injectable()
export class ToursService {
  constructor(
    @InjectModel(Tour.name) private readonly tourModel: Model<Tour>,
  ) {}

  async create(payload) {
    const tour = new this.tourModel(payload);
    await tour.save();
    return tour;
  }

  async getAll() {
    // -pagination
    return await this.tourModel.find()
  }

  async delete(id) {
    const tour = await this.tourModel.deleteOne({ _id: id })
    if(tour.deletedCount !== 0) {
      return 'tour was deleted'
    }
    return 'no tour matched'
  }

  async findById(id) {
    return await this.tourModel.findById(id)
  }

  async edit(id, payload) {
    const tour = await this.tourModel.findById(id)
    if (tour) {
      await tour.updateOne(payload)
      return 'edit tour successfully'
    }
    return 'no tour matched'
  }
}