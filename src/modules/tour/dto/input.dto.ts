import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsMongoId, IsOptional, IsString, IsNumber, IsDate } from 'class-validator';

export class CreateTourDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  placeId: string;

  @ApiProperty()
  @IsNotEmpty()
  place: string

  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  countryId: string

  @ApiProperty()
  @IsNotEmpty()
  country: string

  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  checkIn: Date;

  @ApiProperty()
  @IsNotEmpty()
  checkOut: Date;

  @ApiProperty()
  @IsNotEmpty()
  member: number;

  @ApiProperty()
  @IsNotEmpty()
  price: number;

  @ApiProperty()
  @IsNotEmpty()
  description: string 

  @ApiProperty()
  images: Array<string>;
}

export class EditTourDTO {
  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  name?: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  checkIn?: Date;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  checkOut?: Date;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  member?: number;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  price?: number;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  images?: Array<string>;
}

export class ListTourQuery {
  @ApiProperty({required: false})
  @IsOptional()
  limit: number
  
  @ApiProperty({required: false})
  @IsOptional()
  page: number

  @ApiProperty({required: false})
  @IsOptional()
  @IsString()
  country: string
  
  @ApiProperty({required: false})
  @IsOptional()
  @IsString()
  place: string
  
  @ApiProperty({required: false})
  @IsOptional()
  @IsNumber()
  member: number
  
  @ApiProperty({required: false})
  @IsOptional()
  @IsNumber()
  minprice: number
  
  @ApiProperty({required: false})
  @IsOptional()
  @IsNumber()
  maxprice: number
  
  @ApiProperty({required: false})
  @IsOptional()
  checkin: Date
  
  @ApiProperty({required: false})
  @IsOptional()
  checkout: Date
}