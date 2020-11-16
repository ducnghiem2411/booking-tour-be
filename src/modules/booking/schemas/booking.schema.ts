import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Schema as MongooseSchema } from 'mongoose'
import { Tour } from 'src/modules/tour/schemas/tour.schema'

@Schema()
export class Booking extends Document {
  @Prop()
  username: string

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Tour.name })
  tourId: Tour

  @Prop()
  tour: string

  @Prop({ type: Date, default: Date.now })
  createdAt: Date
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
