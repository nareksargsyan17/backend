import { Module } from '@nestjs/common';
import { FilmController } from './film.controller';
import { FilmService } from './film.service';
import { DatabaseModule } from '@app/common/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from './entity/Film';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { RmqModule } from 'libs/common/rmq/rmq.module';
import { GenreModule } from './genre/genre.module';
import { Genre } from './genre/entity/Genre';
import { Country } from './country/entity/Country';
import { CountryModule } from './country/country.module';
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
    DatabaseModule,
    TypeOrmModule.forFeature([Film, Genre, Country]),
    RmqModule.register({name : "FILM"}),
    GenreModule, 
    CountryModule
  ],
  controllers: [FilmController],
  providers: [FilmService],
  exports: [TypeOrmModule]
})
export class FilmModule {}
