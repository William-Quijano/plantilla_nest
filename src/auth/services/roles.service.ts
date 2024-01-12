import { Injectable } from '@nestjs/common';
import { CreateRoleOrPermissionDto } from '../dto/create-role-or-permission.dto';
import { $rol } from '../generics/generics';
import { CreatePermissionToRolDto } from '../dto/create-permission-to-rol.dto';

@Injectable()
export class RolesService {
  findAll() {
    return `This action returns all roles`;
  }

  async createRol(
    rol: CreateRoleOrPermissionDto | string,
  ): Promise<CreateRoleOrPermissionDto> {
    return await $rol.create(rol);
  }

  async givePermissionTo(permissions: CreatePermissionToRolDto) {
    return await $rol.givePermissionsTo(
      permissions.id_rol,
      permissions.permissions,
    );
  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
