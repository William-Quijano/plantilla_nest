import { IsArray, IsInt } from 'class-validator';

export class CreatePermissionsUserDto {
  @IsInt()
  id_user: number;

  @IsArray()
  permissions: (number | string)[];
}
