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
    await country.save();
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

  async delete(id: string): Promise<string> {
    const country = await this.countryModel.deleteOne({ _id: id })
    if(country.deletedCount !== 0) {
      return 'country was deleted'
    }
    return 'no country matched'
  }

}