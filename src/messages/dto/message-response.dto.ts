import { ApiProperty } from '@nestjs/swagger';

export class MessageResponseDto {
  @ApiProperty({ example: '1' })
  id: string;

  @ApiProperty({ example: 'Hello! How are you doing today?' })
  content: string;

  @ApiProperty({ example: '1' })
  senderId: string;

  @ApiProperty({ example: 'John Doe' })
  senderName: string;

  @ApiProperty({ example: '2' })
  recipientId: string;

  @ApiProperty({ example: 'Jane Smith' })
  recipientName: string;

  @ApiProperty({ example: '2024-01-15T10:30:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: false })
  isRead: boolean;
}