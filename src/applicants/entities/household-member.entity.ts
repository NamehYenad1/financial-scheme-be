import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Applicant } from './applicant.entity';

@Entity()
export class HouseholdMember {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  relationship: string;

  @Column({ type: 'date' })
  dateOfBirth: Date;

  @Column({ type: 'enum', enum: ['male', 'female'], default: 'female' })
  sex: string;

  @ManyToOne(() => Applicant, (applicant) => applicant.householdMembers)
  applicant: Applicant;
}
