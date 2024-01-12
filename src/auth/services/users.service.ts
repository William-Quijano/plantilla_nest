import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreatePermissionsUserDto } from '../dto/create-permissions-user.dto';
import { ModelPermissionsEntity } from '../entities/model_permissions.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRolesUserDto } from '../dto/create-roles-user.dto';
import { ModelRolesEntity } from '../entities/model_roles.entity';

@Injectable()
export class UsersService {
  private user: User;

  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async assignPermissionsUser(
    permissions: CreatePermissionsUserDto,
  ): Promise<ModelPermissionsEntity[]> {
    const userRepository = await this.dataSource.getRepository(User);

    const user = await userRepository.manager.findOneBy(User, {
      id: permissions.id_user,
    });

    const response: ModelPermissionsEntity[] = await user.assignPermissionsUser(
      permissions.permissions,
    );
    return response;
  }

  async assignRolesUser(
    roles: CreateRolesUserDto,
  ): Promise<ModelRolesEntity[]> {
    const userRepository = await this.dataSource.getRepository(User);

    const user = await userRepository.manager.findOneBy(User, {
      id: roles.id_user,
    });

    const response: ModelRolesEntity[] = await user.assignRolsUser(roles.roles);
    return response;
  }

  async findAll(): Promise<string> {
    return 'Find all';
  }

  async findOne(id: number) {
    const user = new User();
    const userRepository = this.dataSource.getRepository(User);
    await userRepository.findOne({ where: { id: id } });
    return user;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
