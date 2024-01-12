import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { PermissionsService } from '../services/permissions.service';
import { CreateRoleOrPermissionDto } from '../dto/create-role-or-permission.dto';
import { CreateRolToPermissionDto } from '../dto/create-rol-to-permission.dto';

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Get()
  findAll() {
    return this.permissionsService.findAll();
  }

  @Post()
  async createPermission(
    @Body() permission: CreateRoleOrPermissionDto | string,
  ): Promise<CreateRoleOrPermissionDto> {
    return await this.permissionsService.createPermission(permission);
  }

  @Post('/roles')
  async givePermissionTo(
    @Body()
    roles: CreateRolToPermissionDto,
  ) {
    return await this.permissionsService.assignRole(roles);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.permissionsService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.permissionsService.remove(+id);
  }
}
