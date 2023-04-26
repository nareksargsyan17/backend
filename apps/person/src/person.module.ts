import { Module } from '@nestjs/common';
import { PersonController } from './person.controller';
import { PersonService } from './person.service';
import { RmqModule } from 'libs/common/rmq/rmq.module';
import { DatabaseModule } from '@app/common/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from './entity/Person';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { PersonfilmsModule } from './personfilms/personfilms.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: "./apps/film/src/.env",
      validationSchema: Joi.object({
        RABBITMQ_URI : Joi.string().required(),
        RABBITMQ_FILM_QUEUE : Joi.string().required()
      })
    }),
    TypeOrmModule.forFeature([Person]),
    DatabaseModule,
    PersonfilmsModule,
    RmqModule,
  ],
  controllers: [PersonController],
  providers: [PersonService],
  exports : [TypeOrmModule]
})
export class PersonModule {}
