import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { Country, CountryDocument } from './schemas/country.schema';

@Injectable()
export class CountriesService {
  constructor(
    @InjectModel(Country.name) private readonly countryModel: Model<CountryDocument>,
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

  async edit(id, payload) {
    const country = await this.countryModel.findById(id)
    if (country) {
      await country.updateOne(payload)
      return 'edit country successfully'
    }
    return 'no country matched'
  }

}