import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsMongoId } from 'class-validator';

export class CreatePlaceDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  country: string;

  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  images: Array<string>;
}

export class EditPlaceDTO {
  @ApiProperty()
  country?: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  name?: string;

  @ApiProperty()
  images?: string;
}
