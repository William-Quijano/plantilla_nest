import { IsString, MinLength } from 'class-validator';

export class CreateRoleOrPermissionDto {
  @IsString()
  @MinLength(3)
  name: string;
}
