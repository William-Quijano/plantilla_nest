import { IsArray, IsInt } from 'class-validator';

export class CreatePermissionToRolDto {
  @IsInt()
  id_rol: number;

  @IsArray()
  permissions: Array<number | string>;
}
