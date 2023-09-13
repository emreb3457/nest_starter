import { Controller, Get, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Auth } from 'src/decorators/customDecorators';
import { ExcelService } from './excel.service';

@ApiTags('Excel Service')
@Controller('excel')
export class ExcelController {
  constructor(private readonly excelService: ExcelService) {}

  @Auth()
  @Get()
  async downloadExcel(@Res() res: Response): Promise<void> {
    const data = [
      { key: 'field_1', value: 'Field1' },
      { key: 'field_2', value: 'Field2' },
    ];

    const excelBuffer = await this.excelService.generateExcel(data);

    res.setHeader('Content-Disposition', 'attachment; filename=data.xlsx');
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.send(excelBuffer);
  }
}
