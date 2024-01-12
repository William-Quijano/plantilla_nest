import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import InitSeeder from './seeds/init.seeder';
import { InternalServerErrorException } from '@nestjs/common';

export const dataSourceOption: DataSourceOptions & SeederOptions = {
  type: (process.env.DB_TYPE as any) || 'postgres',
  host: process.env.POSTGRES_HOST,
  port: +process.env.POSTGRES_PORT || 5432,
  username: process.env.POSTGRES_DB_USER,
  password: `${process.env.POSTGRES_DB_PASSWORD}`,
  database: process.env.POSTGRES_DB_NAME,
  entities: ['dist/**/entities/*.entity{.ts,.js}'],
  migrationsRun: false,
  logging: true,
  migrationsTableName: 'migration',
  migrations: ['dist/database/migrations/*{.ts,.js}'],
  seeds: [InitSeeder],
  synchronize: false,
};

const dataSource: DataSource = new DataSource(
  dataSourceOption as DataSourceOptions & SeederOptions,
);

export default dataSource;
