import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';

export interface Message {
  id: string;
  content: string;
  senderId: string;
  senderName: string;
  recipientId: string;
  recipientName: string;
  createdAt: Date;
  isRead: boolean;
}

@Injectable()
export class MessagesService {
  private messages: Message[] = [
    {
      id: '1',
      content: 'Welcome to the company messaging system!',
      senderId: '1',
      senderName: 'System Admin',
      recipientId: '2',
      recipientName: 'Jane Smith',
      createdAt: new Date('2024-01-15T09:00:00.000Z'),
      isRead: false,
    },
    {
      id: '2',
      content: 'Thank you for the welcome message!',
      senderId: '2',
      senderName: 'Jane Smith',
      recipientId: '1',
      recipientName: 'System Admin',
      createdAt: new Date('2024-01-15T09:15:00.000Z'),
      isRead: true,
    },
  ];

  private nextId = 3;

  findAll(userId: string): Message[] {
    return this.messages.filter(
      message => message.senderId === userId || message.recipientId === userId,
    );
  }

  findById(id: string, userId: string): Message {
    const message = this.messages.find(msg => msg.id === id);
    
    if (!message) {
      throw new NotFoundException('Message not found');
    }

    if (message.senderId !== userId && message.recipientId !== userId) {
      throw new ForbiddenException('Access denied to this message');
    }

    return message;
  }

  create(createMessageDto: CreateMessageDto, senderId: string, senderName: string): Message {
    const message: Message = {
      id: this.nextId.toString(),
      content: createMessageDto.content,
      senderId,
      senderName,
      recipientId: createMessageDto.recipientId,
      recipientName: createMessageDto.recipientName || 'Unknown User',
      createdAt: new Date(),
      isRead: false,
    };

    this.messages.push(message);
    this.nextId++;

    return message;
  }

  markAsRead(id: string, userId: string): Message {
    const message = this.findById(id, userId);
    
    if (message.recipientId !== userId) {
      throw new ForbiddenException('Only the recipient can mark a message as read');
    }

    message.isRead = true;
    return message;
  }
}