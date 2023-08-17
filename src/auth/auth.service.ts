import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { User } from 'src/user/entities';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findByUsername({ username });
    if (user && (await compare(pass, user.password))) {
      const { password, ...rest } = user;
      return rest;
    }
    return null;
  }

  login(user: User) {
    const { id } = user;
    const payload = { sub: id };
    return {
      user,
      accessToken: this.jwtService.sign(payload),
    };
  }
}
