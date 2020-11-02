import { ApiProperty } from '@nestjs/swagger';

export class CreateCountryDTO {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  image: string;
}
