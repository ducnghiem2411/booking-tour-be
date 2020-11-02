import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class GetUserDTO {
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  phone: string;
}
