import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string) {
    const _user = await this.authService.validate(email, password);

    if (!_user) throw new UnauthorizedException('Invalid password!');

    const user = {
      id: _user.id,
      name: _user.first_name + ' ' + _user.last_name,
      email: _user.email,
    };

    return user;
  }
}
