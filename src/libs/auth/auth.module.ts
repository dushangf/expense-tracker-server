import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from 'src/api/users/users.service';
import { JwtStrategy } from './strategies/jwt-strategy';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local-strategy.auth';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [
    JwtModule.register({
      secret: 'xxx',
      signOptions: { expiresIn: '360000s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService, JwtStrategy, LocalStrategy],
})
export class AuthModule {}
