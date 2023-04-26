import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Res,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { Response, Request } from 'express';
import { UsersService } from '../users/users.service';
import { JwtAuthGuard } from 'src/libs/auth/jwt.auth.guard';
import { User } from '@prisma/client';

@Controller('expenses')
export class ExpensesController {
  constructor(
    private readonly expensesService: ExpensesService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() expense: CreateExpenseDto, @Req() req: Request) {
    const user = req.user as User;

    const previousUser = await this.usersService.findOne({ id: user.id });

    await this.usersService.update(
      { id: user.id },
      { salary: previousUser.salary - expense.total },
    );

    return this.expensesService.create(expense);
  }

  @Get()
  findAll(@Param('status') status: string) {
    return this.expensesService.findAll();
  }

  @Get('user/:id')
  async findByUser(@Param('id') id: string, @Query('status') status: string) {
    const expenses = await this.expensesService.findByUserId({
      user_id: id,
      status: status,
    });
    return expenses;
  }

  @UseGuards(JwtAuthGuard)
  @Get('report/download')
  async downloadReport(
    @Req() req: Request,
    @Res() res: Response,
    @Query('category') category: string,
  ) {
    const user = req.user as User;
    const filter = { user_id: user.id, category: category };
    return this.expensesService.downloadReport(user, filter, res);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.expensesService.findOne({ id: id });
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() expense: UpdateExpenseDto,
    @Req() req: Request,
  ) {
    const user = req.user as User;
    const previousExpense = await this.expensesService.findOne({ id: id });

    const previousUser = await this.usersService.findOne({ id: user.id });

    await this.usersService.update(
      { id: user.id },
      { salary: previousUser.salary - previousExpense.total },
    );

    const newExpense = await this.expensesService.update({ id: id }, expense);

    await this.usersService.update(
      { id: user.id },
      { salary: previousUser.salary + previousExpense.total },
    );

    return newExpense;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: Request) {
    const user = req.user as User;

    const previousUser = await this.usersService.findOne({ id: user.id });

    const previousExpense = await this.expensesService.findOne({ id: id });

    await this.usersService.update(
      { id: user.id },
      { salary: previousUser.salary + previousExpense.total },
    );

    return this.expensesService.remove({ id: id });
  }
}
