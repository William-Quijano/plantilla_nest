import { IsArray, IsInt } from 'class-validator';

export class CreateRolesUserDto {
  @IsInt()
  id_user: number;

  @IsArray()
  roles: (number | string)[];
}
