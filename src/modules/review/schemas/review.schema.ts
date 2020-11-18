import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Schema as MongooseSchema } from 'mongoose'
import { Place } from 'src/modules/place/schemas/place.schema'

@Schema()
export class Review extends Document {
  @Prop()
  username: string
  
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Place.name })
  placeId: Place

  @Prop()
  star: number
  
  @Prop()
  content: string
  
  @Prop({ type: Date, default: Date.now })
  createdAt: Date
}

export const ReviewSchema = SchemaFactory.createForClass(Review)
