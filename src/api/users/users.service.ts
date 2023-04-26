import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/libs/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { encrypt } from 'src/utils/encrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: Prisma.UserCreateInput) {
    user.password = await encrypt(user.password);
    const savedUser = await this.prisma.user.create({ data: user });

    delete savedUser.password;

    return { user: savedUser, message: 'user saved successfully' };
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(filter: Prisma.UserWhereUniqueInput) {
    return this.prisma.user.findFirst({ where: filter });
  }

  async update(
    filter: Prisma.UserWhereUniqueInput,
    user: Prisma.UserUpdateInput,
  ) {
    const updatedUser = await this.prisma.user.update({
      where: filter,
      data: user,
    });

    delete updatedUser.password;

    return updatedUser;
  }

  findOneByUsername(email: string) {
    return this.prisma.user.findFirst({ where: { email: email } });
  }

  remove(filter: Prisma.UserWhereUniqueInput) {
    return this.prisma.user.delete({ where: filter });
  }
}
