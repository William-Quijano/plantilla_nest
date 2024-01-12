import { CreateRoleOrPermissionDto } from '../dto/create-role-or-permission.dto';
import dataSource from '../../database/typeorm.config';
import { QueryRunner, Repository } from 'typeorm';
import { Permission } from '../entities/permission.entity';
import { BadRequestException } from '@nestjs/common';
import { Role } from '../entities/role.entity';
import { findEntityData } from '../generics/generics';
import { _ } from 'lodash';

export class Roles {
  async create(
    rol: CreateRoleOrPermissionDto | string,
  ): Promise<CreateRoleOrPermissionDto> {
    await dataSource.initialize();
    const queryRunner: QueryRunner = dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      let createRol;
      if (typeof rol === 'string') {
        createRol = {
          name: rol,
        };
      } else {
        createRol = { ...rol };
      }
      const rolRepository: Repository<Role> = dataSource.getRepository(Role);
      const rolInstance: Permission[] = rolRepository.create(createRol);
      await queryRunner.manager.save(rolInstance);
      await queryRunner.commitTransaction();
      await queryRunner.release();
      return createRol;
    } catch (e) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      await dataSource.destroy();
      throw new BadRequestException(e);
    }
  }

  async givePermissionsTo(
    idRol: number,
    permissions: Array<number | string>,
  ): Promise<Role> {
    await dataSource.initialize();
    const queryRunner: QueryRunner = dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const rolRepository = await dataSource.getRepository(Role);
      const filter = {
        relations: ['permissions'],
        where: {
          id: idRol,
        },
        loadRelationIds: {
          relations: ['permissions'],
        },
      };

      const rolResponse: Role[] | (string | number)[] = await findEntityData(
        Role,
        dataSource,
        filter,
      );

      let permissionIds: (string | number)[] = [];
      rolResponse.forEach(element => {
        const arrayDB: number[] = _.map(element.permissions, _.parseInt);
        const newArray: number[] = _.map(permissions, _.parseInt);
        permissionIds = _.difference(newArray, arrayDB);
      });

      if (permissionIds.length <= 0) {
        throw new BadRequestException(
          'Un permiso o varios permisos ya estan asignados',
        );
      }

      const rolFind = await rolRepository.findOne({
        relations: { permissions: true },
        where: { id: idRol },
      });

      permissionIds.forEach((elementId: string | number) => {
        rolFind.permissions.push({ id: Number(elementId) });
      });
      await queryRunner.manager.save(rolFind);

      await queryRunner.commitTransaction();
      await queryRunner.release();
      return rolFind;
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
