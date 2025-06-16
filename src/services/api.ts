import { User, Message, LoginResponse, CreateMessageDto } from '../types';

const API_BASE_URL = 'http://localhost:3000';

class ApiServiceClass {
  private token: string | null = null;

  setToken(token: string | null) {
    this.token = token;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Network error' }));
      throw new Error(error.message || `HTTP ${response.status}`);
    }

    return response.json();
  }

  async login(email: string): Promise<LoginResponse> {
    return this.request<LoginResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  async getUserProfile(): Promise<User> {
    return this.request<User>('/users/me');
  }

  async getMessages(): Promise<Message[]> {
    return this.request<Message[]>('/messages');
  }

  async sendMessage(messageData: CreateMessageDto): Promise<Message> {
    return this.request<Message>('/messages', {
      method: 'POST',
      body: JSON.stringify(messageData),
    });
  }

  async markMessageAsRead(messageId: string): Promise<Message> {
    return this.request<Message>(`/messages/${messageId}/read`, {
      method: 'PATCH',
    });
  }
}

export const ApiService = new ApiServiceClass();