import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { RolesService } from '../services/roles.service';
import { CreateRoleOrPermissionDto } from '../dto/create-role-or-permission.dto';
import { CreatePermissionToRolDto } from '../dto/create-permission-to-rol.dto';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  findAll() {
    return this.rolesService.findAll();
  }

  @Post()
  async createRol(
    @Body() rol: CreateRoleOrPermissionDto | string,
  ): Promise<CreateRoleOrPermissionDto> {
    return await this.rolesService.createRol(rol);
  }

  @Post('/permissions')
  async givePermissionTo(
    @Body()
    permissions: CreatePermissionToRolDto,
  ) {
    return await this.rolesService.givePermissionTo(permissions);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rolesService.remove(+id);
  }
}
