#!/bin/bash
name=$1
path=$(echo "$name" | tr '[:upper:]' '[:lower:]')
entity=$(
  echo -n "${name:0:1}" | tr '[:lower:]' '[:upper:]'
  echo "${name:1}" | tr '[:upper:]' '[:lower:]'
)

echo "import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
// import { $entity } from 'pathEntity';

export default class "$entity'Seeder'" implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    //const "$entity'Factory'" = await factoryManager.get($entity);

    // save 5 factory generated entities, to the database
    //await "$entity'Factory'".saveMany(5);
  }
}
" >src/database/seeds/$path.seeder.ts
