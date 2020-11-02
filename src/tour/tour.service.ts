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

  async create (CreateTourDTO) {

  }

  async delete () {

  }

  async findById (id) {
    
  }
}