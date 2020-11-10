import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Schema as MongooseSchema } from 'mongoose'
import { Place } from 'src/modules/place/schemas/place.schema'

@Schema()
export class Booking extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Place.name })
  placeId: Place
  
  @Prop()
  place: string

  @Prop()
  count: number
}

export const TourSchema = SchemaFactory.createForClass(Booking);
