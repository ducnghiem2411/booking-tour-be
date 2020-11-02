import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Country extends Document {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  image: string;
}

export const CountrySchema = SchemaFactory.createForClass(Country);
