import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async login(loginDto: LoginDto) {
    const { email } = loginDto;
    
    // Find user by email (in a real app, you'd validate password here)
    const user = this.usersService.findByEmail(email);
    
    if (!user) {
      // For demo purposes, create a new user if not found
      const newUser = this.usersService.create({
        email,
        name: this.extractNameFromEmail(email),
        role: 'user',
      });
      
      return this.generateToken(newUser);
    }

    return this.generateToken(user);
  }

  private generateToken(user: any) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  }

  private extractNameFromEmail(email: string): string {
    return email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  }

  async validateUser(payload: any) {
    return this.usersService.findById(payload.sub);
  }
}