import { Injectable } from '@nestjs/common';

import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { DataSource, Repository } from 'typeorm';
import { ModelRolesEntity } from './entities/model_roles.entity';

@Injectable()
export class AuthService {
  constructor(private readonly datasource: DataSource) {}

  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    const rep: Repository<ModelRolesEntity> =
      this.datasource.getRepository(ModelRolesEntity);

    return rep.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
