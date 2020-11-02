import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CountryDocument = Country & Document
@Schema()
export class Country {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  image: string;
}

export const CountrySchema = SchemaFactory.createForClass(Country);
