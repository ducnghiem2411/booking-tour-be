import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsMongoId } from "class-validator";

export class CreateTourDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsMongoId()
    place: string;

    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    checkIn: Date;

    @ApiProperty()
    @IsNotEmpty()
    checkOut: Date;

    @ApiProperty()
    @IsNotEmpty()
    member: number;

    @ApiProperty()
    @IsNotEmpty()
    price: number;

    @ApiProperty()
    @IsNotEmpty()
    images: Array<string>
}

export class EditTourDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsMongoId()
    placeId: string

    @ApiProperty()
    place: string

    @ApiProperty()
    name?: string

    @ApiProperty()
    checkIn?: Date;

    @ApiProperty()
    checkOut?: Date;

    @ApiProperty()
    member?: number;

    @ApiProperty()
    price?: number;

    @ApiProperty()
    images?: Array<string>
}

