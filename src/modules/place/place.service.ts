import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { Place } from './schemas/place.schema';
import { Country } from '../country/schemas/country.schema';

import { PlaceDTO } from './dto/output.dto';
import { EditPlaceDTO, CreatePlaceDTO } from './dto/input.dto';

@Injectable()
export class PlacesService {
  constructor(
    @InjectModel(Place.name) private readonly placeModel: Model<Place>,
    @InjectModel(Country.name) private readonly countryModel: Model<Country>
  ) {}

  async create(payload: CreatePlaceDTO): Promise<PlaceDTO> {
    const country = await this.countryModel.find({ _id: payload.countryId, name: payload.country})
    if (!country.length) {
      throw new BadRequestException('Country id or name does not match')
    }
    else {
      const place = new this.placeModel(payload);
      await place.save();
      return place;
    }
  }

  async getAll(): Promise<PlaceDTO[]> {
    // -pagination
    return await this.placeModel.find()
  }

  async getPlaceByCountryId(id: string): Promise<PlaceDTO[]> {
    return await this.placeModel.find({ countryId: id })
  }

  async edit(id: string, payload: EditPlaceDTO): Promise<string> {
    const place = await this.placeModel.findById(id)
    if (!place) {
      throw new BadRequestException('Id not match')
    }
    const country = await this.countryModel.find({ _id: payload.countryId, name: payload.country})
    if (!country.length) {
      throw new BadRequestException('Country id or name does not match')
    }
    await place.updateOne(payload)
    return 'edit place successfully'
  }

  async delete(id: string): Promise<string> {
    const place = await this.placeModel.deleteOne({ _id: id })
    if(place.deletedCount !== 0) {
      return 'place was deleted'
    }
    else {
      throw new BadRequestException('Id not match')
    }
  }

}