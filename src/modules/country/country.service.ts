import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { Country } from './schemas/country.schema';

import { CountryDTO } from './dto/output.dto';
import { CreateCountryDTO, EditCountryDTO } from './dto/input.dto';

@Injectable()
export class CountriesService {
  constructor(
    @InjectModel(Country.name) private readonly countryModel: Model<Country>,
  ) {}

  async create(payload: CreateCountryDTO): Promise<CountryDTO> {
    const country = new this.countryModel(payload);
    await country.save();
    return country;
  }

  async getAll(): Promise<CountryDTO[]> {
    // -pagination
    return await this.countryModel.find()
  }

  async edit(id: string, payload: EditCountryDTO): Promise<string> {
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