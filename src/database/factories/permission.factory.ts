import { setSeederFactory } from 'typeorm-extension';
import { Permission } from '../../auth/entities/permission.entity';

export default setSeederFactory(Permission, async faker => {
  const permission: Permission = new Permission();

  permission.name = faker.person.firstName('male');

  return permission;
});
