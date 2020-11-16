import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateReviewDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  content: string
  
  @ApiProperty()
  @IsNotEmpty()
  star: number

  @ApiProperty()
  @IsNotEmpty()
  tourId: string
  
  @ApiProperty()
  @IsNotEmpty()
  placeId: string
}
