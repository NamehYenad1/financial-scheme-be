import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { MaritalStatus, EmploymentStatus } from '../applicant-status.enum';
import { HouseholdMember } from './household-member.entity';
import { Application } from '../../applications/entities/application.entity';

@Entity()
export class Applicant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: EmploymentStatus,
    default: EmploymentStatus.Unemployed,
  })
  employmentStatus: EmploymentStatus;

  @Column({
    type: 'enum',
    enum: MaritalStatus,
    default: MaritalStatus.Single,
  })
  maritalStatus: MaritalStatus;

  @Column({ type: 'enum', enum: ['male', 'female'], default: 'male' })
  sex: string;

  @Column({ type: 'date' })
  dateOfBirth: Date;

  @OneToMany(
    () => HouseholdMember,
    (householdMember) => householdMember.applicant,
    {
      cascade: true,
    },
  )
  householdMembers: HouseholdMember[];

  @OneToMany(() => Application, (application) => application.applicant)
  applications: Application[];
}
