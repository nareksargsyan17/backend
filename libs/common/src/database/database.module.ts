import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from 'apps/comment/src/entity/Comment';
import { Country } from 'apps/film/src/country/entity/Country';
import { Film } from 'apps/film/src/entity/Film';
import { Genre } from 'apps/film/src/genre/entity/Genre';
import { Person } from 'apps/person/src/entity/Person';
import { Role } from 'apps/person/src/entity/Role';
import { PersonFilm } from 'apps/person/src/personfilms/entity/PersonFilm';
import { User } from 'apps/user/src/entity/User';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get('DATABASE_HOST'),
          port: configService.get('DATABASE_PORT'),
          username: configService.get('DATABASE_USER'),
          password: configService.get('DATABASE_PASSWORD'),
          database: configService.get('DATABASE'),
          entities: [
            Film,
            Genre,
            Country,
            Person,
            PersonFilm,
            Role,
            User,
            Comment,
          ],
          logging: false,
          autoLoadEntities: true,
          synchronize: true,
          migrations: [],
          subscribers: [],
        };
      },
      inject: [ConfigService],
    }),
  ],
  exports: [DatabaseModule, TypeOrmModule],
})
export class DatabaseModule {}
