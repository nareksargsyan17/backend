import { NestFactory } from '@nestjs/core';
import { CommentModule } from './comment.module';
import { RmqService } from 'libs/common/rmq/rmq.service';

async function bootstrap() {
  const app = await NestFactory.create(CommentModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions('FILM'));
}
bootstrap();
