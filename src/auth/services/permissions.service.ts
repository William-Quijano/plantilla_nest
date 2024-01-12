import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateRoleOrPermissionDto } from '../dto/create-role-or-permission.dto';
import { $permission } from '../generics/generics';
import { CreateRolToPermissionDto } from '../dto/create-rol-to-permission.dto';

@Injectable()
export class PermissionsService {
  constructor(private readonly dataSource: DataSource) {}

  findAll() {
    return `This action returns all permissions`;
  }

  async createPermission(
    permission: CreateRoleOrPermissionDto | string,
  ): Promise<CreateRoleOrPermissionDto> {
    return await $permission.create(permission);
  }

  async assignRole(roles: CreateRolToPermissionDto) {
    return await $permission.assignRole(roles.id_permission, roles.roles);
  }

  findOne(id: number) {
    return `This action returns a #${id} permission`;
  }

  remove(id: number) {
    return `This action removes a #${id} permission`;
  }
}
