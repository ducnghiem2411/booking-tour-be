import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Place } from 'src/modules/place/schemas/place.schema';

@Schema()
export class Tour extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Place.name })
  placeId: Place;

  @Prop()
  place: string
  
  @Prop()
  name: string;

  @Prop()
  checkIn: Date;

  @Prop()
  checkOut: Date;

  @Prop()
  price: number;

  @Prop()
  member: number;

  @Prop()
  images: Array<string>;
}

export const TourSchema = SchemaFactory.createForClass(Tour);
