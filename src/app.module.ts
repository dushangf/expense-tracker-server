import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './api/users/users.module';
import { ExpensesModule } from './api/expenses/expenses.module';
import { AuthModule } from './libs/auth/auth.module';
import { AuthService } from './libs/auth/auth.service';
import { UsersService } from './api/users/users.service';
import { PrismaService } from './libs/prisma/prisma.service';
import { LocalStrategy } from './libs/auth/strategies/local-strategy.auth';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './libs/auth/auth.controller';
import { JwtService } from '@nestjs/jwt';
import { PrismaModule } from './libs/prisma/prisma.module';
import { CloudinaryModule } from './libs/cloudinary/cloudinary.module';

@Module({
  imports: [UsersModule, ExpensesModule, AuthModule, PassportModule, PrismaModule, CloudinaryModule],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService, UsersService, PrismaService, LocalStrategy, JwtService],
})
export class AppModule {}
