import { Injectable, NotAcceptableException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/api/users/users.service';

import { verify } from 'src/utils/encrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validate(email: string, password: string) {
    const user = await this.usersService.findOneByUsername(email);

    if (!user) {
      throw new NotAcceptableException('User not found!');
    }

    const validPassword = await verify(password, user.password);

    if (user && validPassword) {
      return user;
    }

    return null;
  }

  async login(user: Record<string, any>) {
    const payload = user;

    return {
      access_token: this.jwtService.sign(payload, { secret: 'xxx' }),
    };
  }
}
