import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Applicant } from '../../applicants/entities/applicant.entity';
import { Scheme } from '../../schemes/entities/scheme.entity';

@Entity()
export class Application {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Applicant, (applicant) => applicant.applications)
  applicant: Applicant;

  @ManyToOne(() => Scheme, (scheme) => scheme.applications)
  scheme: Scheme;

  @Column({ type: 'date' })
  applicationDate: Date;

  @Column({
    type: 'enum',
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending',
  })
  status: 'Pending' | 'Approved' | 'Rejected';

  @Column({ nullable: true })
  remarks: string;
}
