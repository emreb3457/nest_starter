import { Roles } from 'src/types/type';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { Company } from './company.entity';
import { UserRole } from './user_role.entity';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  @Unique(['email'])
  email: string;

  @Column()
  password: string;

  @Column()
  address: string;

  @Column()
  phone_number: string;

  @ManyToOne(() => UserRole, (role) => role.id)
  @JoinColumn({ name: 'role_id' })
  role_id: UserRole;

  @ManyToOne(() => Company, (company) => company.id)
  @JoinColumn({ name: 'company_id' })
  company_id: Company;
}
