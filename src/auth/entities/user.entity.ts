import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Person } from './person.entity';
import { ModelRolesEntity } from './model_roles.entity';
import { PolymorphicChildren } from 'typeorm-polymorphic';
import { ModelPermissionsEntity } from './model_permissions.entity';
import { RolesPermissions } from '../role_permission/roles_permissions.class';

@Entity('users', { schema: 'mantenimientos' })
export class User extends RolesPermissions {
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint', unsigned: true })
  id: number;

  @Column('varchar', {
    unique: true,
  })
  email?: string;

  @Column('text')
  password?: string;

  @Column('varchar', {
    length: 255,
  })
  last_login?: string;

  @Column('boolean', {
    default: false,
  })
  is_suspended?: boolean;

  @Column('varchar', {
    length: 255,
  })
  token_valid_after?: string;

  @Column('boolean', {
    default: false,
  })
  two_factor_status?: boolean;

  @Column('boolean', {
    default: false,
  })
  verified?: boolean;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at?: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updated_at?: Date;

  @OneToOne(() => Person, person => person.user)
  person?: Person;

  @PolymorphicChildren(() => ModelRolesEntity, {
    eager: false,
  })
  model_roles?: ModelRolesEntity[];

  @PolymorphicChildren(() => ModelPermissionsEntity, {
    eager: false,
  })
  model_permission?: ModelPermissionsEntity[];
}
