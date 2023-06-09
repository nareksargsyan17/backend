import { NestFactory } from '@nestjs/core';
import { FilmModule } from './film.module';
import axios from 'axios';
import { PersonService } from 'apps/person/src/person.service';
import { FilmService } from './film.service';
import { date } from 'joi';
import * as cookieParser from 'cookie-parser';
import { RmqService } from 'libs/common/rmq/rmq.service';
import { Person } from 'apps/person/src/entity/Person';
import { PersonfilmsService } from 'apps/person/src/personfilms/personfilms.service';

async function bootstrap() {
  const app = await NestFactory.create(FilmModule, { cors: true });
  app.use(cookieParser());
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions('FILM'));
  app.enableCors();
}
bootstrap();
