import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Place } from 'src/modules/place/schemas/place.schema';
import { Country } from 'src/modules/country/schemas/country.schema';


@Schema()
export class Tour extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Country.name })
  countryId: Country

  @Prop()
  country: string

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Place.name })
  placeId: Place;

  @Prop()
  place: string
  
  @Prop()
  name: string;

  @Prop()
  checkIn: string;

  @Prop()
  checkOut: string;

  @Prop()
  price: number;

  @Prop()
  member: number;

  @Prop()
  images: Array<string>;
}

export const TourSchema = SchemaFactory.createForClass(Tour);
