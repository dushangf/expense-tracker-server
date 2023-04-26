import { Injectable } from '@nestjs/common';
import * as PDFDocuments from 'pdfkit';
import { Response } from 'express';
import { User } from '@prisma/client';

@Injectable()
export class PdfService {
  downloadReport(
    res: Response,
    expenses: Record<string, any>[],
    category: any,
    user: User
  ) {
    const doc = new PDFDocuments();

    let _x: number = doc.x;
    let _y: number = doc.y;

    let x: number = _x;
    let y: number = _x;

    doc.pipe(res);

    doc.fontSize(20);
    doc.font('Helvetica-Bold');

    doc.text(`Expense Report for ${category}`);

    doc.font('Helvetica');
    doc.fontSize(12);
    doc.moveDown();
    doc.moveDown();
    y = doc.y;
    doc.moveTo(50, y).lineTo(560, y).stroke();
    doc.moveDown();
    doc.moveDown();
    y = doc.y;

    doc.text('Name', _x + 10, y);
    doc.text('Date', _x + 80, y);
    doc.text('Total', _x + 160, y);
    doc.text('Notes', _x + 220, y);

    expenses.map((expense, idx) => {
      doc.text(expense.name, _x + 10, y + 20 * (idx + 1));
      doc.text(expense.date, _x + 80, y + 20 * (idx + 1));
      doc.text(expense.total, _x + 160, y + 20 * (idx + 1));
      doc.text(expense.notes, _x + 220, y + 20 * (idx + 1));
    });

    doc.end();
  }
}
