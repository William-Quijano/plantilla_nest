import {
  AbstractPolymorphicRepository,
  PolymorphicRepository,
} from 'typeorm-polymorphic';
import { ModelPermissionsEntity } from '../entities/model_permissions.entity';

@PolymorphicRepository(ModelPermissionsEntity)
export class ModelPermissionRepository extends AbstractPolymorphicRepository<ModelPermissionsEntity> {}
