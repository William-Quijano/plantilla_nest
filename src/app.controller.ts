import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('inicio')
export class AppController {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }
}
