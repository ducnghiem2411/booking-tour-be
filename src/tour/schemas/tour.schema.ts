import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Place } from 'src/place/schemas/place.schema';

@Schema()
export class Tour extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Place.name })
  place: Place;

  @Prop()
  name: string;

  @Prop()
  checkIn: string;

  @Prop()
  checkOut: number;

  @Prop()
  price: number;

  @Prop()
  member: number;

  @Prop()
  images: Array<string>;
}

export const TourSchema = SchemaFactory.createForClass(Tour);
