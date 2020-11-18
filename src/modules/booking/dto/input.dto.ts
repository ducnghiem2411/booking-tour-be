import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"

export class BookingDTO {
  @ApiProperty()
  @IsNotEmpty()
  tourId: string
  
  @ApiProperty()
  @IsNotEmpty()
  tour: string
}