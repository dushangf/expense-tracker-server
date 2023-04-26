import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/libs/prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import { PdfService } from 'src/libs/pdf/pdf.service';
import { Response } from 'express';

@Injectable()
export class ExpensesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly pdf: PdfService,
  ) {}

  create(expense: Prisma.ExpenseUncheckedCreateInput) {
    return this.prisma.expense.create({ data: expense });
  }

  findAll() {
    return this.prisma.expense.findMany();
  }

  findOne(filter: Prisma.ExpenseWhereUniqueInput) {
    return this.prisma.expense.findFirst({ where: filter });
  }

  findByUserId(filter: Prisma.ExpenseWhereInput) {
    return this.prisma.expense.findMany({ where: filter });
  }

  update(
    filter: Prisma.ExpenseWhereUniqueInput,
    expense: Prisma.ExpenseUpdateInput,
  ) {
    return this.prisma.expense.update({ where: filter, data: expense });
  }

  remove(filter: Prisma.ExpenseWhereUniqueInput) {
    return this.prisma.expense.delete({ where: filter });
  }

  async downloadReport(
    user: User,
    filter: Prisma.ExpenseWhereInput,
    res: Response,
  ) {
    const expenses = await this.prisma.expense.findMany({ where: filter });

    res.writeHead(200, {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment;filename=${filter.category}.pdf`,
    });

    return this.pdf.downloadReport(res, expenses, filter.category, user);
  }
}
