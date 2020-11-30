import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from 'mongoose'


@Schema()
export class Subscriber extends Document {
  @Prop()
  email: string

  @Prop({ type: Boolean, default: false })
  isActive: Boolean

  @Prop({ type: String, default: '' })
  activeToken: string
}

export const SubscriberSchema = SchemaFactory.createForClass(Subscriber)