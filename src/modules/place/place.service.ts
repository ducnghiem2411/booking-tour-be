import { Injectable, BadRequestException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { Model } from 'mongoose'
import { Place } from './schemas/place.schema'
import { Country } from '../country/schemas/country.schema'

import { PlaceDTO } from './dto/output.dto'
import { EditPlaceDTO, CreatePlaceDTO } from './dto/input.dto'
import { Tour } from '../tour/schemas/tour.schema'
import { MSG } from 'src/shared/message';

@Injectable()
export class PlacesService {
  constructor(
    @InjectModel(Place.name) private readonly placeModel: Model<Place>,
    @InjectModel(Country.name) private readonly countryModel: Model<Country>,
    @InjectModel(Tour.name) private readonly tourModel: Model<Tour>
  ) {}

  async create(payload: CreatePlaceDTO): Promise<PlaceDTO> {
    const country = await this.countryModel.findOne({ _id: payload.countryId, name: payload.country })
    if (!country) {
      throw new BadRequestException(MSG.ID_OR_NAME_NOT_MATCH)
    }
    const place = await this.placeModel.findOne({ name: payload.name })
    if (place) {
      throw new BadRequestException(MSG.RESOURCE_EXISTED)
    }
    const newPlace = new this.placeModel(payload)
    await newPlace.save()
    return newPlace
  }

  async getAll(): Promise<PlaceDTO[]> {
    // -pagination
    return await this.placeModel.find()
  }

  async getPlaceByCountryId(id: string): Promise<PlaceDTO[]> {
    return await this.placeModel.find({ countryId: id })
  }

  async edit(id: string, payload: EditPlaceDTO): Promise<any> {
    const editedPlace = await this.placeModel.findByIdAndUpdate(id, payload, { new: true })
    if (!editedPlace) {
      throw new BadRequestException(MSG.ID_NOT_MATCH)
    }
    return editedPlace
  }

  async delete(id: string): Promise<string> {
    const place = await this.placeModel.findOneAndDelete({ _id: id })
    if (place) {
      await this.tourModel.deleteMany({ placeId: id })
      return MSG.RESOURCE_DELETED_SUCCESS
    }
    else {
      throw new BadRequestException(MSG.ID_NOT_MATCH)
    }
  }

}