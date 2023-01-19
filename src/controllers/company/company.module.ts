import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { CommonRepository } from 'src/repository/common.repository';
import { Company } from 'src/entity/company.entity';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { CompanyLicence } from 'src/entity/company_licence.entity';
import { CompanyRepository } from 'src/repository/company.repository';
import { UserRepository } from 'src/repository/user.repository';
import { DateService } from 'src/otherServices/date.service';

@Module({
  imports: [TypeOrmModule.forFeature([Company, User, CompanyLicence])],
  providers: [
    CompanyService,
    CommonRepository,
    UserRepository,
    DateService,
    CompanyRepository,
  ],
  exports: [CompanyRepository],
  controllers: [CompanyController],
})
export class CompanyModule {}
