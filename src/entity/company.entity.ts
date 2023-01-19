import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';

@Entity('companies')
export class Company extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  company_name: string;

  @OneToOne(() => User, (users) => users.id)
  @JoinColumn({ name: 'master_id' })
  master_id: number;
}
