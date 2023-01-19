import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { Company } from './company.entity';

@Entity('company_licances')
export class CompanyLicence extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  time: Date;

  @ManyToOne(() => Company, (companies) => companies.id)
  @JoinColumn({ name: 'company_id' })
  company_id: Company;

  @Column()
  type: string;
}
