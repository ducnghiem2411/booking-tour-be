import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

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
  @IsOptional()
  @IsNotEmpty()
  name?: string
  
  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  description?: string
  
  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  image?: string
}
