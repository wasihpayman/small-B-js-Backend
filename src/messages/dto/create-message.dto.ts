import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDto {
  @ApiProperty({
    description: 'Message content',
    example: 'Hello! How are you doing today?',
    minLength: 1,
    maxLength: 1000,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(1000)
  content: string;

  @ApiProperty({
    description: 'ID of the message recipient',
    example: '2',
  })
  @IsString()
  @IsNotEmpty()
  recipientId: string;

  @ApiProperty({
    description: 'Name of the message recipient (optional)',
    example: 'Jane Smith',
    required: false,
  })
  @IsString()
  recipientName?: string;
}