import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    const nameApp = 'Nombre de la app';
    return `Hello World! ${nameApp}`;
  }
}
