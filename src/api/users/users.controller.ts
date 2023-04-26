import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express, Request } from 'express';
import { CloudinaryService } from 'src/libs/cloudinary/cloudinary.service';
import { JwtAuthGuard } from 'src/libs/auth/jwt.auth.guard';
import { User } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Post()
  create(@Body() user: CreateUserDto) {
    return this.usersService.create(user);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('loggedIn')
  findOne(@Req() req: Request) {
    const user = req.user as User;
    return this.usersService.findOne({ id: user.id });
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  update(@Body() user: UpdateUserDto, @Req() req: Request) {
    const authUser = req.user as User;
    return this.usersService.update({ id: authUser.id }, user);
  }

  @Patch('picture')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async updatePhoto(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
  ) {
    const user = req.user as User;

    const fileRes = await this.cloudinaryService.upload(file, user.id);

    console.log(fileRes)

    const updatedUser = await this.usersService.update(
      { id: user.id },
      { image_url: fileRes.secure_url },
    );

    return updatedUser;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove({ id: id });
  }
}
