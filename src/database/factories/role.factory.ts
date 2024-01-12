import { setSeederFactory } from 'typeorm-extension';
import { Role } from '../../auth/entities/role.entity';

export default setSeederFactory(Role, async faker => {
  const rol: Role = new Role();

  rol.name = faker.person.firstName('male');

  return rol;
});
