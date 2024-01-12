import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('persons', { schema: 'mantenimientos' })
export class Person {
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint', unsigned: true })
  id: number;

  @Column('varchar', {
    length: 100,
  })
  name: string;

  @Column('varchar', {
    length: 100,
  })
  last_name: string;

  @Column('varchar', {
    length: 10,
    unique: true,
  })
  dui: string;

  @OneToOne(() => User, user => user.person)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
