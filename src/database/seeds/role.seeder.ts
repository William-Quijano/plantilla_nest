import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Role } from '../../auth/entities/role.entity';

export default class RoleSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const RoleFactory = await factoryManager.get(Role);

    // save 5 factory generated entities, to the database
    await RoleFactory.saveMany(5);
  }
}
