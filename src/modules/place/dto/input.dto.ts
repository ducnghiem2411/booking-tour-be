import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsMongoId, IsOptional } from 'class-validator';

export class CreatePlaceDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  countryId: string;

  @ApiProperty()
  @IsNotEmpty()
  country: string

  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  image: string;
}

export class EditPlaceDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  countryId: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  country?: string
  
  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  description?: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  name?: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  image?: string;
}
