import { BadRequestException } from '@nestjs/common';
import dataSource from '../../database/typeorm.config';
import { AbstractPolymorphicRepository } from 'typeorm-polymorphic';
import { ModelPermissionRepository } from '../repository/model_permission.repository';
import { ModelRolRepository } from '../repository/model_rol.repository';
import { QueryRunner } from 'typeorm';
import { findEntityData } from '../generics/generics';
import { ModelPermissionsEntity } from '../entities/model_permissions.entity';
import { User } from '../entities/user.entity';
import { ModelRolesEntity } from '../entities/model_roles.entity';

export class RolesPermissions {
  /**
   * Asigna permisos a un usuaqrio
   * @param permissionAssign
   */
  async assignPermissionsUser(
    permissionAssign: Array<number | string>,
  ): Promise<ModelPermissionsEntity[]> {
    await dataSource.initialize();
    const queryRunner: QueryRunner = dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const repositoryPoly = AbstractPolymorphicRepository.createRepository(
        dataSource,
        ModelPermissionRepository,
      );
      const user: User = Object.assign(this);
      const filter = {
        relations: {
          permission: true,
        },
        where: {
          entityId: user.id,
        },
        loadRelationIds: {
          relations: ['permission'],
        },
      };
      const permissionsResponse = await findEntityData(
        ModelPermissionsEntity,
        dataSource,
        filter,
        permissionAssign,
        'permission',
      );
      const modelPermissionsEntity: ModelPermissionsEntity[] = [];
      if (permissionsResponse.length <= 0) {
        throw new BadRequestException('Permisos ya asignados');
      } else {
        permissionsResponse.forEach(permission => {
          const entity: ModelPermissionsEntity = new ModelPermissionsEntity();
          entity.owner = user;
          entity.permission = { id: permission };
          modelPermissionsEntity.push(entity);
        });

        await queryRunner.manager
          .withRepository(repositoryPoly)
          .save(modelPermissionsEntity);
      }

      await queryRunner.commitTransaction();
      await queryRunner.release();
      await dataSource.destroy();
      return modelPermissionsEntity;
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

  async assignRolsUser(
    rolesAssign: Array<number | string>,
  ): Promise<ModelRolesEntity[]> {
    await dataSource.initialize();
    const queryRunner: QueryRunner = dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const repositoryPoly = AbstractPolymorphicRepository.createRepository(
        dataSource,
        ModelRolRepository,
      );
      const user: User = Object.assign(this);
      const filter = {
        relations: {
          role: true,
        },
        where: {
          entityId: user.id,
        },
        loadRelationIds: {
          relations: ['role'],
        },
      };
      const roleResponse = await findEntityData(
        ModelRolesEntity,
        dataSource,
        filter,
        rolesAssign,
        'role',
      );

      const modelRolesEntity: ModelRolesEntity[] = [];
      if (roleResponse.length <= 0) {
        throw new BadRequestException('Roles ya asignados');
      } else {
        roleResponse.forEach(permission => {
          const entity: ModelRolesEntity = new ModelRolesEntity();
          entity.owner = user;
          entity.role = { id: permission };
          modelRolesEntity.push(entity);
        });

        await queryRunner.manager
          .withRepository(repositoryPoly)
          .save(modelRolesEntity);
      }

      await queryRunner.commitTransaction();
      await queryRunner.release();
      await dataSource.destroy();
      return modelRolesEntity;
    } catch (e) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      await dataSource.destroy();
      if (e.code === '23503') {
        throw new BadRequestException('Uno de los roles no existe');
      } else {
        throw new BadRequestException(e);
      }
    }
  }
}
