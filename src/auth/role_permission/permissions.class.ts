import { CreateRoleOrPermissionDto } from '../dto/create-role-or-permission.dto';
import { QueryRunner, Repository } from 'typeorm';
import dataSource from '../../database/typeorm.config';
import { Permission } from '../entities/permission.entity';
import { BadRequestException } from '@nestjs/common';
import { findEntityData } from '../generics/generics';
import { _ } from 'lodash';

export class Permissions {
  async create(
    permission: CreateRoleOrPermissionDto | string,
  ): Promise<CreateRoleOrPermissionDto> {
    await dataSource.initialize();
    const queryRunner: QueryRunner = dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      let createPermission;
      if (typeof permission === 'string') {
        createPermission = {
          name: permission,
        };
      } else {
        createPermission = { ...permission };
      }
      const permissionRepository: Repository<Permission> =
        dataSource.getRepository(Permission);
      const permissionInstance: Permission[] =
        permissionRepository.create(createPermission);
      await queryRunner.manager.save(permissionInstance);
      await queryRunner.commitTransaction();
      await queryRunner.release();
      return createPermission;
    } catch (e) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      await dataSource.destroy();
      throw new BadRequestException(e);
    }
  }

  async assignRole(
    idPermission: number,
    roles: Array<number | string>,
  ): Promise<Permission> {
    await dataSource.initialize();
    const queryRunner: QueryRunner = dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const permissionRepository = await dataSource.getRepository(Permission);
      const filter = {
        relations: ['roles'],
        where: {
          id: idPermission,
        },
        loadRelationIds: {
          relations: ['roles'],
        },
      };

      const rolResponse: Permission[] | (string | number)[] =
        await findEntityData(Permission, dataSource, filter);

      let roleIds: (string | number)[] = [];
      rolResponse.forEach(element => {
        const arrayDB: number[] = _.map(element.roles, _.parseInt);
        const newArray: number[] = _.map(roles, _.parseInt);

        roleIds = _.difference(newArray, arrayDB);
      });

      if (roleIds.length <= 0) {
        throw new BadRequestException(
          'Un rol o varios roles ya estan asignados',
        );
      }

      const permissionFind = await permissionRepository.findOne({
        relations: { roles: true },
        where: { id: idPermission },
      });

      roleIds.forEach((elementId: string | number) => {
        permissionFind.roles.push({ id: Number(elementId) });
      });
      await queryRunner.manager.save(permissionFind);

      await queryRunner.commitTransaction();
      await queryRunner.release();
      return permissionFind;
    } catch (e) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      await dataSource.destroy();
      if (e.code === '23503') {
        throw new BadRequestException('Uno de los permisos no existe');
      } else {
        throw new BadRequestException(e);
      }
    }
  }
}
