import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Scheme } from './scheme.entity';

@Entity()
export class Benefit {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @ManyToOne(() => Scheme, (scheme) => scheme.benefits)
  scheme: Scheme;
}
