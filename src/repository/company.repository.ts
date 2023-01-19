import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateCompanyDto } from 'src/dto/company.dto';
import { Company } from 'src/entity/company.entity';
import { CompanyLicence } from 'src/entity/company_licence.entity';
import { User } from 'src/entity/user.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class CompanyRepository {
  constructor(
    @InjectRepository(Company) public companyRepository: Repository<Company>,
    private dataSource: DataSource,
  ) {}

  async getCompanyById(id: number) {
    return this.companyRepository.findOne({
      where: { id },
    });
  }

  async createCompany(
    company: Company,
    user: User,
    companyLicance: CompanyLicence,
  ) {
    return this.dataSource.transaction(async (transactionalEntityManager) => {
      const saveUser = await transactionalEntityManager.save(user);
      company.master_id = saveUser.id;
      const saveCompany = await transactionalEntityManager.save(company);
      companyLicance.company_id = saveCompany;
      await transactionalEntityManager.save(companyLicance);
      saveUser.company_id = saveCompany;
      await transactionalEntityManager.save(user);
      return saveCompany;
    });
  }

  async updateCompany(companyData: UpdateCompanyDto) {
    return this.companyRepository.save({
      ...companyData,
    });
  }

  async deleteCompany(id: number) {
    return this.companyRepository.delete(id);
  }
}
