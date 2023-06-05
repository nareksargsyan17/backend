import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';
import * as cookieParser from 'cookie-parser';
import { RmqService } from 'libs/common/rmq/rmq.service';
import * as session from 'express-session';
import * as passport from 'passport';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);
  app.use(cookieParser());
  app.enableCors({
    origin : true,
    credentials : true
  })
  const rmqService = app.get<RmqService>(RmqService);
	app.connectMicroservice(rmqService.getOptions('FILM'));
	await app.startAllMicroservices();
  app.use(
    session({
      secret: 'asiodasjoddjdoasddasoidjasiodasdjaiodd',
      saveUninitialized: false,
      resave: false,
      cookie: {
        httpOnly : true,
        maxAge: 60000,
      },
    }),
  );
  const config = new DocumentBuilder()
  .setTitle('ivi backend')
  .setDescription('The ivi  API description')
  .setVersion('1.0.0')
  .addTag('film')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.use(passport.initialize());
  app.use(passport.session());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  await app.listen(4000);
}
bootstrap();
