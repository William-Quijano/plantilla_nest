import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { ModelPermissionsEntity } from '../entities/model_permissions.entity';
import { CreatePermissionsUserDto } from '../dto/create-permissions-user.dto';
import { CreateRolesUserDto } from '../dto/create-roles-user.dto';
import { ModelRolesEntity } from '../entities/model_roles.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/assign/permissions')
  async assignPermissionsUser(
    @Body() permissions: CreatePermissionsUserDto,
  ): Promise<ModelPermissionsEntity[]> {
    return await this.usersService.assignPermissionsUser(permissions);
  }

  @Post('/assign/roles')
  async assignRolesUser(
    @Body() roles: CreateRolesUserDto,
  ): Promise<ModelRolesEntity[]> {
    return await this.usersService.assignRolesUser(roles);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
