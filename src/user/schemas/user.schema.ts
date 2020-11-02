import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  age: number;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  phone: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
