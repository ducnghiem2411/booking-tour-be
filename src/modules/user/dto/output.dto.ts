import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class GetUserDTO {
  username: string;
  email: string;
}

export class LoggedInDTO {
  accessToken: string
  username: string;
  email: string;
}
