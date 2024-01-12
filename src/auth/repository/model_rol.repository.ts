import {
  AbstractPolymorphicRepository,
  PolymorphicRepository,
} from 'typeorm-polymorphic';
import { ModelRolesEntity } from '../entities/model_roles.entity';

@PolymorphicRepository(ModelRolesEntity)
export class ModelRolRepository extends AbstractPolymorphicRepository<ModelRolesEntity> {}
