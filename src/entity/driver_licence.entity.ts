import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { Driver } from './driver.entity';

@Entity('driver_licances')
export class DriverLicence extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  licence_number: number;

  @ManyToOne(() => Driver, (drivers) => drivers.id)
  @JoinColumn({ name: 'employee_id' })
  employee_id: number;

  @Column()
  rfid_chip_code: number;

  @Column()
  expiration_date: number;
}
