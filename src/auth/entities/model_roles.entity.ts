import { PolymorphicChildInterface } from 'typeorm-polymorphic/dist/polymorphic.interface';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PolymorphicParent } from 'typeorm-polymorphic';
import { Role } from './role.entity';
import { User } from './user.entity';

@Entity('model_has_roles', { schema: 'mantenimientos' })
export class ModelRolesEntity implements PolymorphicChildInterface {
  @PolymorphicParent(() => [User])
  owner: User;

  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint', unsigned: true })
  id: number;

  @ManyToOne(() => Role, role => role.model_role)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @Column('varchar', {
    length: 255,
  })
  entityType: string;

  @Column('bigint')
  entityId: number | string;
}
