import { Injectable, BadRequestException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { sendMail } from 'src/shared/mailer'
import { TokenService } from '../token/token.service'

import { Model } from 'mongoose'
import { Tour } from './schemas/tour.schema'
import { Place } from '../place/schemas/place.schema'
import { Subscriber } from '../tour/schemas/subscriber.schema'

import { CreateTourDTO, EditTourDTO, ListTourQuery, SubscribeDTO } from './dto/input.dto'
import { TourDTO } from './dto/output.dto'

import { isEmpty } from 'lodash'
import { confirmSubscribeMail } from './mail-content/confirm-subscribe'
import { newTourMail } from './mail-content/new-tour'
import { MSG } from 'src/shared/message'

@Injectable()
export class ToursService {
  constructor(
    @InjectModel(Tour.name) private readonly tourModel: Model<Tour>,
    @InjectModel(Place.name) private readonly placeModel: Model<Place>,
    @InjectModel(Subscriber.name) private readonly subscriberModel: Model<Subscriber>,
    private readonly tokenService: TokenService,
  ) {}

  async create(payload: CreateTourDTO): Promise<TourDTO> {
    const place = await this.placeModel.findOne({ _id: payload.placeId, name: payload.place })
    if (!place) {
      throw new BadRequestException(MSG.ID_OR_NAME_NOT_MATCH)
    }
    payload.checkIn = new Date(payload.checkIn)
    payload.checkOut = new Date(payload.checkOut)
    const tour = new this.tourModel(payload)
    await tour.save()
    return tour
  }

  async sendToSubscribers (tourId: string): Promise<string> {
    const subscribers = await this.subscriberModel.find({ isActive: true }).select('email')
    const subs = subscribers.map(s => s.email)
    const newsMail = await sendMail(newTourMail(subs, 'News', `New tour on Tour Nest ${tourId}`)) //change me later
    if (newsMail) {
      return MSG.SEND_NEWS_SUCCESS
    }
    return MSG.SEND_NEWS_FAILED
  }

  async subscribe (body: SubscribeDTO, host): Promise<Boolean> {
    const sub = await this.subscriberModel.findOne({ email: body.email })
    if (sub) { return false }
    const token = await this.tokenService.generateToken({ email: body.email }, { expiresIn: 60*60*5 })
    const url = `http://${host}/tours/subscribers/confirmation/${token}`
    const registerSubMail = await sendMail(confirmSubscribeMail(body.email, url))
    if (registerSubMail) {
      const newSubscriber = new this.subscriberModel({ ...body, activeToken: token })
      await newSubscriber.save()
      return true
    }
    return false
  }

  async subscribeResponse (token) {
    const payload = await this.tokenService.getPayload(token)
    if (!payload) { return false }
    const subscriber = await this.subscriberModel.findOneAndUpdate(
      { activeToken: token },
      { isActive: true },
      { new: true }
    )
    if (subscriber) { return true }
    return false
  }

  async getAll(options: ListTourQuery): Promise<any> {
    if (isEmpty(options)) { return await this.tourModel.find() }
    if (options.limit && options.page) {
      const limit = Number(options.limit)
      const page = Number(options.page)
      const tours = await this.tourModel.find()
      .sort('checkIn')
      .skip(limit*page - limit)
      .limit(limit)
      .exec()
      const total = await this.tourModel.find().estimatedDocumentCount().exec()
      return { totalTour: total, page: page, perPage: limit, tours: [...tours] }
    }

    const result = await this.tourModel
    .find({
      country: options.country,
      place: options.place,
      //default values when params is null
      price: {
        $gte: options.minprice || 0,
        $lte: options.maxprice || 9999999999
      },
      member: { $gte: Number(options.member) || 0 }
    })
    .sort({ name: 'asc' })
    .exec()
    return result
  }

  async getTourByPlaceId(id: string): Promise<TourDTO[]> {
    return await this.tourModel.find({ placeId: id })
  }

  async delete(id: string): Promise<string> {
    const tour = await this.tourModel.deleteOne({ _id: id })
    if (tour.deletedCount !== 0) { return MSG.TOUR_DELETED }
    return MSG.TOUR_NOT_MATCH
  }

  async findById(id: string): Promise<TourDTO> {
    return await this.tourModel.findById(id)
  }

  async edit(id: string, payload: EditTourDTO): Promise<string> {
    const editedTour = await this.tourModel.findByIdAndUpdate(id, payload, {new: true})
    if (!editedTour) {
      throw new BadRequestException(MSG.ID_NOT_MATCH)
    }
    return editedTour
  }

}

// checkIn: { $gte: new Date(options.checkin) || new Date('1000-01-01') }
// checkOut: { $lte: new Date(options.checkout) || new Date('9999-01-01') },
