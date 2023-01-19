import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import * as csurf from 'csurf';
import { config } from 'dotenv';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './middleware/error.middleware';
import { HttpAdapterHost } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  config();
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(helmet());
  const documentConfig = new DocumentBuilder()
    .setTitle('Driver App')
    .setDescription('Driver App API description')
    .setVersion('1.0')
    .addTag('driver_app')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, documentConfig);
  SwaggerModule.setup('api', app, document);
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
