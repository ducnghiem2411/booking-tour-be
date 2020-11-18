import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsEmail, MaxLength, MinLength } from 'class-validator'

export class LoginDTO {
  @ApiProperty()
  @IsNotEmpty()
  email: string

  @ApiProperty()
  @IsNotEmpty()
  password: string
}

export class CreateUserDTO {
  @ApiProperty()
  @MaxLength(20)
  username: string

  @ApiProperty()
  @IsEmail()
  email: string

  @ApiProperty()
  @MinLength(6)
  password: string
}
