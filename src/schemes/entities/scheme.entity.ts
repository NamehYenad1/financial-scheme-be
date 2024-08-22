import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Application } from '../../applications/entities/application.entity';
import { Benefit } from './benefit.entity';

@Entity()
export class Scheme {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('jsonb')
  criteria: {
    employment_status: string;
    has_children?: {
      school_level: string;
    };
  };

  @OneToMany(() => Benefit, (benefit) => benefit.scheme, {
    cascade: true,
  })
  benefits: Benefit[];

  @OneToMany(() => Application, (application) => application.scheme)
  applications: Application[];
}
