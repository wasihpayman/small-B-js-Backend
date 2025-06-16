import { ApiProperty } from '@nestjs/swagger';

class UserDto {
  @ApiProperty({ example: '1' })
  id: string;

  @ApiProperty({ example: 'john.doe@company.com' })
  email: string;

  @ApiProperty({ example: 'John Doe' })
  name: string;

  @ApiProperty({ example: 'user' })
  role: string;
}

export class LoginResponseDto {
  @ApiProperty({
    description: 'JWT access token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  access_token: string;

  @ApiProperty({
    description: 'User information',
    type: UserDto,
  })
  user: UserDto;
}