import { DataSource } from 'typeorm';
import { runSeeders, Seeder, SeederFactoryManager } from 'typeorm-extension';

import {
  permissionFactory,
  personFactory,
  roleFactory,
  userFactory,
} from '../factories';
import UserSeeder from './user.seeder';
import PersonSeeder from './person.seeder';
import RoleSeeder from './role.seeder';
import PermissionSeeder from './permission.seeder';

export default class InitSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    await runSeeders(dataSource, {
      seeds: [UserSeeder, PersonSeeder, RoleSeeder, PermissionSeeder],
      factories: [userFactory, personFactory, permissionFactory, roleFactory],
    });
  }
}
