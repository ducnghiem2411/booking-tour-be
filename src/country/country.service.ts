import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { Country } from './schemas/country.schema';

@Injectable()
export class CountriesService {
  constructor(
    @InjectModel(Country.name) private readonly countryModel: Model<Country>,
  ) {}

  async create(body) {
    const country = new this.countryModel(body);
    country.save();
    return country;
  }

  async getAll() {
    // -pagination
    return await this.countryModel.find()
  }

}