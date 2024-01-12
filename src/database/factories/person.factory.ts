import { setSeederFactory } from 'typeorm-extension';
import { Person } from '../../auth/entities/person.entity';

export default setSeederFactory(Person, async faker => {
  const person: Person = new Person();

  person.name = faker.person.firstName('male');
  person.last_name = faker.person.lastName('male');
  person.dui = faker.string.numeric({ length: 9 });

  return person;
});
