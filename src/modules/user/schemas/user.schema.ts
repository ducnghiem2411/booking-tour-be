import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema()
export class User extends Document {
  @Prop()
  username: string

  @Prop()
  email: string

  @Prop()
  password: string

  @Prop()
  phone: string

  @Prop()
  bio: string

  @Prop()
  avatar: string

  @Prop({ type: Boolean, default: false })
  isActive: Boolean

  @Prop({ type: String, default: '' })
  activeAccountToken: string

  @Prop({ type: String, default: '' })
  resetPasswordToken: string
}

export const UserSchema = SchemaFactory.createForClass(User)
