import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { JwtUser } from './types/jwt-user.type';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) return null;

    const match = await bcrypt.compare(password, user.password);
    if (!match) return null;
    return {
      id: user.id,
      email: user.email,
    };
  }

  login(user: JwtUser) {
    const payload = {
      sub: user.id,
      email: user.email,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
