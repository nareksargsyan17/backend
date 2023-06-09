import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';
import * as cookieParser from 'cookie-parser';
import { RmqService } from 'libs/common/rmq/rmq.service';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(UserModule);
  app.use(cookieParser());
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions('FILM'));
}
bootstrap();
