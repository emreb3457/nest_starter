import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { CompanyModule } from './controllers/company/company.module';
import { UserModule } from './controllers/user/user.module';
import { dataSourceOptions } from './database/dataSource';
import { TransformResponseInterceptor } from './interceptors/response.interceptor';

config();
@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    UserModule,
    CompanyModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformResponseInterceptor,
    },
  ],
})
export class AppModule {}
