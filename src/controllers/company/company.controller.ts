import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { Auth } from 'src/decorators/customDecorators';
import { CreateCompanyDto, UpdateCompanyDto } from 'src/dto/company.dto';
import { Company } from 'src/entity/company.entity';
import { QueryType, Roles } from 'src/types/type';
import { CompanyService } from './company.service';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Auth(Roles.SUPERADMIN, Roles.ADMIN)
  @Post()
  async createCompany(
    @Body() createCompanyDto: CreateCompanyDto,
  ): Promise<Company> {
    return this.companyService.createCompany(createCompanyDto);
  }

  @Auth(Roles.ADMIN)
  @Get()
  async getCompanies(@Query() query: QueryType): Promise<Company> {
    const { limit, page } = query;
    return this.companyService.getCompanies(limit, page);
  }

  @Auth()
  @Get(':id')
  async getCompany(@Param('id') id: number): Promise<Company> {
    return this.companyService.getCompany(id);
  }

  @Auth(Roles.SUPERADMIN, Roles.ADMIN, Roles.COMPANY_ADMIN)
  @Put()
  async updateCompany(
    @Body() updateCompanyDto: UpdateCompanyDto,
  ): Promise<Company> {
    return this.companyService.updateCompany(updateCompanyDto);
  }

  @Auth(Roles.SUPERADMIN, Roles.ADMIN)
  @Delete(':id')
  async removeCompany(@Param('id') id: number): Promise<any> {
    this.companyService.deleteCompany(id);
    return {
      success: true,
    };
  }
}
