import { IsArray, IsInt } from 'class-validator';

export class CreateRolToPermissionDto {
  @IsInt()
  id_permission: number;

  @IsArray()
  roles: Array<number | string>;
}
