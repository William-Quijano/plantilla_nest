import { Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';

import { Role } from './role.entity';
import { Content } from './content.abstract';
import { ModelRolesEntity } from './model_roles.entity';

@Entity('permissions', { schema: 'mantenimientos' })
export class Permission extends Content {
  @ManyToMany(() => Role, role => role.permissions, {
    eager: true,
  })
  @JoinTable({
    name: 'role_has_permissions',
    joinColumn: {
      name: 'permission_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
  })
  roles?: Role[];

  @OneToMany(() => ModelRolesEntity, modelRole => modelRole.role)
  model_role?: ModelRolesEntity;
}
