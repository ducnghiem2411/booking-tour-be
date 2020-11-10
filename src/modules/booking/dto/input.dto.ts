import { ApiProperty } from "@nestjs/swagger";

export class BookingDTO {
  @ApiProperty()
  placeId: string
  
  @ApiProperty()
  place: string
}