import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Schema as MongooseSchema } from 'mongoose'
import { Country } from 'src/modules/country/schemas/country.schema'

@Schema()
export class Place extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Country.name })
  countryId: Country

  @Prop()
  country: string
  
  @Prop()
  name: string

  @Prop()
  description: string

  @Prop()
  image: string
}

export const PlaceSchema = SchemaFactory.createForClass(Place)
