import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCountryDTO {
  @ApiProperty()
  @IsNotEmpty()
  name: string

  @ApiProperty()
  @IsNotEmpty()
  description: string

  @ApiProperty()
  image: string
}

export class EditCountryDTO {
  @ApiProperty()
  name?: string

  @ApiProperty()
  description?: string

  @ApiProperty()
  image?: string
}
