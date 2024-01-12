import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Person } from './entities/person.entity';
import { Permission } from './entities/permission.entity';
import { Role } from './entities/role.entity';
import { ConfigModule } from '@nestjs/config';
import { ModelPermissionsEntity } from './entities/model_permissions.entity';
import { ModelRolesEntity } from './entities/model_roles.entity';
import { ModelPermissionRepository } from './repository/model_permission.repository';
import { ModelRolRepository } from './repository/model_rol.repository';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { PermissionsController } from './controllers/permissions.controller';
import { PermissionsService } from './services/permissions.service';
import { RolesController } from './controllers/roles.controller';
import { RolesService } from './services/roles.service';

@Module({
  controllers: [
    AuthController,
    UsersController,
    PermissionsController,
    RolesController,
  ],
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([
      User,
      Person,
      Permission,
      Role,
      ModelPermissionsEntity,
      ModelRolesEntity,
      ModelPermissionRepository,
      ModelRolRepository,
    ]),
  ],
  providers: [AuthService, UsersService, PermissionsService, RolesService],
})
export class AuthModule {}
