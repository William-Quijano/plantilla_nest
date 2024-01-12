import { Entity, ManyToMany, OneToMany } from 'typeorm';
import { Permission } from './permission.entity';
import { Content } from './content.abstract';
import { ModelRolesEntity } from './model_roles.entity';

@Entity('roles', { schema: 'mantenimientos' })
export class Role extends Content {
  @ManyToMany(() => Permission, permission => permission.roles)
  permissions?: Permission[];

  @OneToMany(() => ModelRolesEntity, modelRole => modelRole.role)
  model_role?: ModelRolesEntity;
}
