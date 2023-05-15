import { Injectable } from '@nestjs/common';
import { User } from 'src/entity/user.entity';
import * as bcryptjs from 'bcryptjs';
import { CommonRepository } from 'src/repository/base.repository';
import { Company } from 'src/entity/company.entity';
import { CreateCompanyDto, UpdateCompanyDto } from 'src/dto/company.dto';
import { Roles, userRoleId } from 'src/types/type';
import { CompanyLicence } from 'src/entity/company_licence.entity';
import { CompanyRepository } from 'src/repository/company.repository';
import { UserRepository } from 'src/repository/user.repository';
import { DateService } from 'src/otherServices/date.service';

@Injectable()
export class CompanyService {
  constructor(
    private companyRepository: CompanyRepository,
    private repositoryService: CommonRepository,
    private userRepository: UserRepository,
    private dateService: DateService,
  ) {}

  async createCompany(createCompanyDto: CreateCompanyDto): Promise<Company> {
    const user = Object.assign(new User(), createCompanyDto);
    user.role_id = userRoleId.get(Roles.COMPANY_ADMIN) as any;
    user.password = await bcryptjs.hash(createCompanyDto.password, 10);
    delete user.company_name;

    const company = new Company();
    company.company_name = createCompanyDto.company_name;

    const companyLicance = new CompanyLicence();
    companyLicance.type = 'system';
    companyLicance.time = this.dateService.addYear(
      new Date(),
      createCompanyDto.time || 1,
    );
    return this.companyRepository.createCompany(company, user, companyLicance);
  }

  async getCompanies(limit?: string, page?: string): Promise<any> {
    const companies = await this.repositoryService.paginate(
      'Company',
      parseInt(page),
      parseInt(limit),
    );

    return companies;
  }

  async getCompany(id: number): Promise<Company> {
    const company = await this.companyRepository.getCompanyById(id);
    return company;
  }

  async updateCompany(updateCompanyDto: UpdateCompanyDto): Promise<Company> {
    const updateCompany = await this.companyRepository.updateCompany(
      updateCompanyDto,
    );
    return updateCompany;
  }

  async deleteCompany(id: number) {
    await this.companyRepository.deleteCompany(id);
  }
}
