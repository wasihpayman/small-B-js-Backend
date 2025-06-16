import { Controller, Get, Post, Body, Param, Patch, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessageResponseDto } from './dto/message-response.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetUser } from '../users/decorators/get-user.decorator';
import { User } from '../users/users.service';

@ApiTags('Messages')
@Controller('messages')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all messages for the current user' })
  @ApiResponse({
    status: 200,
    description: 'Messages retrieved successfully',
    type: [MessageResponseDto],
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  findAll(@GetUser() user: User): MessageResponseDto[] {
    const messages = this.messagesService.findAll(user.id);
    return messages.map(message => ({
      id: message.id,
      content: message.content,
      senderId: message.senderId,
      senderName: message.senderName,
      recipientId: message.recipientId,
      recipientName: message.recipientName,
      createdAt: message.createdAt,
      isRead: message.isRead,
    }));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific message' })
  @ApiResponse({
    status: 200,
    description: 'Message retrieved successfully',
    type: MessageResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 403,
    description: 'Access denied to this message',
  })
  @ApiResponse({
    status: 404,
    description: 'Message not found',
  })
  findOne(@Param('id') id: string, @GetUser() user: User): MessageResponseDto {
    const message = this.messagesService.findById(id, user.id);
    return {
      id: message.id,
      content: message.content,
      senderId: message.senderId,
      senderName: message.senderName,
      recipientId: message.recipientId,
      recipientName: message.recipientName,
      createdAt: message.createdAt,
      isRead: message.isRead,
    };
  }

  @Post()
  @ApiOperation({ summary: 'Send a new message' })
  @ApiResponse({
    status: 201,
    description: 'Message created successfully',
    type: MessageResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  create(@Body() createMessageDto: CreateMessageDto, @GetUser() user: User): MessageResponseDto {
    const message = this.messagesService.create(createMessageDto, user.id, user.name);
    return {
      id: message.id,
      content: message.content,
      senderId: message.senderId,
      senderName: message.senderName,
      recipientId: message.recipientId,
      recipientName: message.recipientName,
      createdAt: message.createdAt,
      isRead: message.isRead,
    };
  }

  @Patch(':id/read')
  @ApiOperation({ summary: 'Mark a message as read' })
  @ApiResponse({
    status: 200,
    description: 'Message marked as read successfully',
    type: MessageResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 403,
    description: 'Only the recipient can mark a message as read',
  })
  @ApiResponse({
    status: 404,
    description: 'Message not found',
  })
  markAsRead(@Param('id') id: string, @GetUser() user: User): MessageResponseDto {
    const message = this.messagesService.markAsRead(id, user.id);
    return {
      id: message.id,
      content: message.content,
      senderId: message.senderId,
      senderName: message.senderName,
      recipientId: message.recipientId,
      recipientName: message.recipientName,
      createdAt: message.createdAt,
      isRead: message.isRead,
    };
  }
}