import { Injectable, BadRequestException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { Model } from 'mongoose'
import { Country } from './schemas/country.schema'

import { CountryDTO } from './dto/output.dto'
import { CreateCountryDTO, EditCountryDTO } from './dto/input.dto'

@Injectable()
export class CountriesService {
  constructor(
    @InjectModel(Country.name) private readonly countryModel: Model<Country>,
  ) {}

  async create(payload: CreateCountryDTO): Promise<CountryDTO> {
    const country = await this.countryModel.findOne({ name: payload.name })
    if (country) {
      throw new BadRequestException('Country is existed')
    }
    const newCountry = new this.countryModel(payload)
    await newCountry.save()
    return newCountry
  }

  async getAll(): Promise<CountryDTO[]> {
    // -pagination
    return await this.countryModel.find()
  }

  async getById (id: string): Promise<CountryDTO> {
    return await this.countryModel.findById(id)
  }

  async edit(id: string, payload: EditCountryDTO): Promise<string> {
    const country = await this.countryModel.findById(id)
    if (!country) {
      throw new BadRequestException('Id not match')
    }
    await country.updateOne(payload)
    const editedCountry = await this.countryModel.findById(id)
    console.log('editedCountry', editedCountry);
    return editedCountry
  }

  async delete(id: string): Promise<string> {
    const country = await this.countryModel.deleteOne({ _id: id })
    if(country.deletedCount === 0) {
      throw new BadRequestException('Id not match')
    }
    return 'country was deleted'
  }

}