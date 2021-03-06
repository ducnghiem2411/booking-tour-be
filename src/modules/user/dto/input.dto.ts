import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsEmail, MaxLength, MinLength, IsOptional } from 'class-validator'

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

export class ResetPasswordDTO {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string
}

export class EditUserDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  bio: string

  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  phone: string
  
  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  image: string
}

export class ChangePasswordDTO {
  @ApiProperty()
  @IsNotEmpty()
  oldPassword: string

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(6)
  newPassword: string
}

export class LoginWithGoogleDTO  {
  @ApiProperty()
  @IsNotEmpty()
  googleAccessToken: string

  @ApiProperty()
  @IsNotEmpty()
  expiredIn: string

  @ApiProperty()
  @IsNotEmpty()
  username: string

  @ApiProperty()
  @IsNotEmpty()
  email: string

  @ApiProperty()
  @IsNotEmpty()
  image: string
}