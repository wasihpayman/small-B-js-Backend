import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: 'User email address',
    example: 'john.doe@company.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}