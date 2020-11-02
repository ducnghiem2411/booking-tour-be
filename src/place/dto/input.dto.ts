import { ApiProperty } from "@nestjs/swagger";

export class CreatePlaceDTO {
    @ApiProperty()
    name: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    country: string;

    @ApiProperty()
    images: Array<string>;
}