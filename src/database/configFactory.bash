#!/bin/bash
name=$1
path=$(echo "$name" | tr '[:upper:]' '[:lower:]')
entity=$(
  echo -n "${name:0:1}" | tr '[:lower:]' '[:upper:]'
  echo "${name:1}" | tr '[:upper:]' '[:lower:]'
)

echo "import { setSeederFactory } from 'typeorm-extension';
//import { $entity } from 'pathEntity';

export default setSeederFactory($entity, async faker => {
  const $path: $entity = new $entity();

  // define your entity params

  return $path;
});" > src/database/factories/$path.factory.ts
