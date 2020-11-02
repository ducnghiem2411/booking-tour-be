import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Country } from 'src/country/schemas/country.schema';

@Schema()
export class Place extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Country.name })
  country: Country;

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  images: Array<string>;
}

export const PlaceSchema = SchemaFactory.createForClass(Place);
