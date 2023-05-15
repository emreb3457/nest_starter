import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { CommonRepository } from 'src/repository/base.repository';
import { UserRepository } from 'src/repository/user.repository';
import { CompanyService } from '../company/company.service';
import { CompanyModule } from '../company/company.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
    CompanyModule,
  ],
  providers: [UserService, CommonRepository, UserRepository],
  controllers: [UserController],
})
export class UserModule {}
