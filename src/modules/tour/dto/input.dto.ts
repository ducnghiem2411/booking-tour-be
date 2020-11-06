import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsMongoId, IsOptional } from "class-validator";

export class CreateTourDTO {
    @ApiProperty()
    @IsNotEmpty()
    // @IsMongoId()
    place: string;

    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    checkIn: string;

    @ApiProperty()
    @IsNotEmpty()
    checkOut: string;

    @ApiProperty()
    @IsNotEmpty()
    member: number;

    @ApiProperty()
    @IsNotEmpty()
    price: number;

    @ApiProperty()
    images: Array<string>
}

export class EditTourDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsMongoId()
    placeId: string

    @ApiProperty()
    @IsOptional()
    @IsNotEmpty()
    place: string

    @ApiProperty()
    @IsOptional()
    @IsNotEmpty()
    name?: string

    @ApiProperty()
    @IsOptional()
    @IsNotEmpty()
    checkIn?: Date;

    @ApiProperty()
    @IsOptional()
    @IsNotEmpty()
    checkOut?: Date;

    @ApiProperty()
    @IsOptional()
    @IsNotEmpty()
    member?: number;

    @ApiProperty()
    @IsOptional()
    @IsNotEmpty()
    price?: number;

    @ApiProperty()
    @IsOptional()
    @IsNotEmpty()
    images?: Array<string>
}

