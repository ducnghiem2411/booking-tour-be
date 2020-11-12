import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { Tour } from './schemas/tour.schema';

import { CreateTourDTO, EditTourDTO } from './dto/input.dto';
import { TourDTO } from './dto/output.dto';
import { Place } from '../place/schemas/place.schema';

@Injectable()
export class ToursService {
  constructor(
    @InjectModel(Tour.name) private readonly tourModel: Model<Tour>,
    @InjectModel(Place.name) private readonly placeModel: Model<Place>
  ) {}

  async create(payload: CreateTourDTO): Promise<TourDTO> {
    const place = await this.placeModel.findOne({ _id: payload.placeId, name: payload.place })
    if (!place) {
      throw new BadRequestException('Place id or name does not match')
    }
    const tour = new this.tourModel(payload);
    await tour.save();
    return tour;
  }

  async getAll(): Promise<TourDTO[]> {
    // -pagination
    return await this.tourModel.find()
  }

  async getTourByPlaceId(id: string): Promise<TourDTO[]> {
    return await this.tourModel.find({ placeId: id })
  }

  async delete(id: string): Promise<string> {
    const tour = await this.tourModel.deleteOne({ _id: id })
    if(tour.deletedCount !== 0) {
      return 'tour was deleted'
    }
    return 'no tour matched'
  }

  async findById(id: string): Promise<TourDTO> {
    return await this.tourModel.findById(id)
  }


  async edit(id: string, payload: EditTourDTO): Promise<string> {
    const tour = await this.tourModel.findById(id)
    if (tour) {
      await tour.updateOne(payload)
      return 'edit tour successfully'
    }
    return 'no tour matched'
  }
}