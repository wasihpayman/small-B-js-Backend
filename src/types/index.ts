export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  createdAt: string;
}

export interface Message {
  id: string;
  content: string;
  senderId: string;
  senderName: string;
  recipientId: string;
  recipientName: string;
  createdAt: string;
  isRead: boolean;
}

export interface LoginResponse {
  access_token: string;
  user: User;
}

export interface CreateMessageDto {
  content: string;
  recipientId: string;
  recipientName?: string;
}