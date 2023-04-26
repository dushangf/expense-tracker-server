import { Module } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { ExpensesController } from './expenses.controller';
import { PdfService } from 'src/libs/pdf/pdf.service';
import { UsersService } from '../users/users.service';

@Module({
  controllers: [ExpensesController],
  providers: [ExpensesService, UsersService, PdfService],
})
export class ExpensesModule {}
