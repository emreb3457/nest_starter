import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  MinLength,
  IsPhoneNumber,
  IsEmail,
  IsDate,
  IsOptional,
  IsNumber,
} from 'class-validator';

export class CreateCompanyDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  surname: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsPhoneNumber()
  @IsNotEmpty()
  phone_number: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  company_name: string;

  @ApiProperty()
  @IsOptional()
  @IsDate()
  time: Date;
}

export class UpdateCompanyDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  company_id: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  company_name: string;

  @ApiProperty()
  @IsOptional()
  @IsDate()
  time: Date;
}
