import { Injectable } from '@nestjs/common';
import { Workbook, Worksheet } from 'exceljs';

type DataType = {
  value: string;
};

@Injectable()
export class ExcelService {
  async generateExcel(data: DataType[]) {
    const workbook = new Workbook();
    const worksheet: Worksheet = workbook.addWorksheet('Sheet1');

    worksheet.columns = [
      { header: 'Head1', key: 'field1', width: 15 },
      { header: 'Head2', key: 'field2', width: 15 },
    ];

    data.forEach((item) => {
      worksheet.addRow({
        field1: item.value,
        field2: item.value,
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
  }
}
