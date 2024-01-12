import { setSeederFactory } from 'typeorm-extension';
import { User } from '../../auth/entities/user.entity';

export default setSeederFactory(User, async faker => {
  const user = new User();
  user.email = faker.internet.email('admin');
  user.password =
    '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'; // password
  user.last_login = faker.string.alpha({ length: 5 });
  user.token_valid_after = faker.string.alpha({ length: 5 });

  return user;
});
