import { ApiProperty } from "@nestjs/swagger";
import { IsEmpty } from "class-validator";

export class CreateTourDTO {
    @ApiProperty()
    @IsEmpty()
    place: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    checkIn: Date;

    @ApiProperty()
    checkOut: Date;

    @ApiProperty()
    member: number;

    @ApiProperty()
    price: number;

    @ApiProperty()
    images: Array<string>
}

