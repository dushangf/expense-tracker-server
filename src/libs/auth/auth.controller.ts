import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local.auth.guard';
import { Request, Response } from 'express';
import { LoginDto } from './login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Req() req: Request,
    @Body() body: LoginDto,
    @Res() res: Response,
  ) {
    const user: any = req.user;

    const { password, ...rest } = user;

    const token = await this.authService.login(user);

    res.set('Authorization', 'Bearer ' + token.access_token);

    return res.send({
      message: 'Login Successful',
      access_token: token.access_token,
      user: rest,
    });
  }
}
