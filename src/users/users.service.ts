import { Injectable } from '@nestjs/common';

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  createdAt: Date;
}

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: '1',
      email: 'admin@company.com',
      name: 'System Admin',
      role: 'admin',
      createdAt: new Date(),
    },
    {
      id: '2',
      email: 'jane.smith@company.com',
      name: 'Jane Smith',
      role: 'user',
      createdAt: new Date(),
    },
  ];

  private nextId = 3;

  findAll(): User[] {
    return this.users;
  }

  findById(id: string): User | undefined {
    return this.users.find(user => user.id === id);
  }

  findByEmail(email: string): User | undefined {
    return this.users.find(user => user.email === email);
  }

  create(userData: { email: string; name: string; role: string }): User {
    const user: User = {
      id: this.nextId.toString(),
      ...userData,
      createdAt: new Date(),
    };
    
    this.users.push(user);
    this.nextId++;
    
    return user;
  }
}