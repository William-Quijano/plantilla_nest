import { DataSource, EntityTarget, Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { Permissions } from '../role_permission/permissions.class';
import { Roles } from '../role_permission/roles.class';
import { _ } from 'lodash';

export async function findEntityData<T>(
  entityClass: EntityTarget<T>,
  dataSource: DataSource,
  filters = {},
  arrayFind: Array<number | string> = [],
  column = '',
): Promise<Array<number | string> | T[]> {
  try {
    const repository: Repository<T> = dataSource.getRepository(entityClass);
    const findEntity: T[] = await repository.find(filters);
    if (arrayFind.length > 0 && findEntity.length > 0) {
      let assignArray: number[] = [];
      findEntity.forEach(element => {
        const arrayDB: number[] = _.map(element[column], _.parseInt);
        const newArray: number[] = _.map(arrayFind, _.parseInt);
        assignArray = _.difference(newArray, arrayDB);
      });
      return assignArray;
    } else if (findEntity.length === 0) {
      return _.map(arrayFind, _.parseInt);
    } else {
      return findEntity;
    }
  } catch (e) {
    throw new NotFoundException(e);
  }
}

export const $permission: Permissions = new Permissions();
export const $rol: Roles = new Roles();
