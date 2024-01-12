import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PolymorphicParent } from 'typeorm-polymorphic';
import { PolymorphicChildInterface } from 'typeorm-polymorphic/dist/polymorphic.interface';
import { User } from './user.entity';
import { Permission } from './permission.entity';

@Entity('model_has_permissions', { schema: 'mantenimientos' })
export class ModelPermissionsEntity implements PolymorphicChildInterface {
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint', unsigned: true })
  id: number;

  @PolymorphicParent(() => [User])
  owner: User;

  @ManyToOne(() => Permission, permission => permission.model_role)
  @JoinColumn({ name: 'permission_id' })
  permission: Permission;

  @Column('varchar', {
    length: 255,
  })
  entityType: string;

  @Column('bigint')
  entityId: number | string;
}
