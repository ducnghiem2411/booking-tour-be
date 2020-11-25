import { Injectable, BadRequestException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { Model } from 'mongoose'
import { Country } from './schemas/country.schema'
import { Place } from '../place/schemas/place.schema'
import { Tour } from '../tour/schemas/tour.schema'

import { CountryDTO } from './dto/output.dto'
import { CreateCountryDTO, EditCountryDTO } from './dto/input.dto'

@Injectable()
export class CountriesService {
  constructor(
    @InjectModel(Country.name) private readonly countryModel: Model<Country>,
    @InjectModel(Place.name) private readonly placeModel: Model<Place>,
    @InjectModel(Tour.name) private readonly tourModel: Model<Tour>,
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

  async getTopDestination(): Promise<any> {
    const tour = await this.tourModel.aggregate()
    .unwind('countryId', 'country', 'placeId', 'place')
    //group all tour has the same placeId and count
    .group({
      _id: '$countryId',
      country: { '$first': '$country' },
      placeId: { '$first': '$placeId' },
      place: { '$first': '$place' },
      totalTour: { '$sum': 1 },
    })
    //highest totalTour 1st
    .sort({ totalTour: -1 })
    .limit(6)
    .exec()
    const queryArray = tour.map(t => ({ _id: t._id }))
    const country = await this.countryModel.find({
      $or: queryArray
    })
    const result = tour.map((t,i) => ({...t, image: country[i].image}))
    return result 
  }
  
  async getById (id: string): Promise<CountryDTO> {
    return await this.countryModel.findById(id)
  }

  async edit(id: string, payload: EditCountryDTO): Promise<string> {
    const editedCountry = await this.countryModel.findByIdAndUpdate(id, payload, {new: true})
    if (!editedCountry) {
      throw new BadRequestException('Id not match')
    }
    return editedCountry
  }

  async delete(id: string): Promise<string> {
    const country = await this.countryModel.findOneAndDelete({ _id: id })
    if (country) {
      await this.placeModel.deleteMany({ countryId: country._id })
      await this.tourModel.deleteMany({ countryId: country._id })
      return 'Country was deleted'
    }
    else {
      throw new BadRequestException('Id not match')
    }
  }

}