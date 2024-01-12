import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Permission } from '../../auth/entities/permission.entity';

export default class PermissionSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const PermissionFactory = await factoryManager.get(Permission);

    // save 5 factory generated entities, to the database
    await PermissionFactory.saveMany(5);
  }
}
