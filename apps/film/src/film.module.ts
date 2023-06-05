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
import { PersonModule } from 'apps/person/src/person.module';
import { PersonfilmsModule } from 'apps/person/src/personfilms/personfilms.module';
import { AuthGuard } from 'apps/user/src/guard/Auth.guard';
import { JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Badge } from './entity/Badge';
@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: './apps/film/src/.env',
			validationSchema: Joi.object({
				RABBITMQ_URI: Joi.string().required(),
				RABBITMQ_FILM_QUEUE: Joi.string().required(),
			}),
		}),
		DatabaseModule,
		TypeOrmModule.forFeature([Film, Genre, Country, Badge]),
		RmqModule,
		GenreModule,
		PersonModule,
		PersonfilmsModule,
		// PassportModule.register({session : true})
	],
	controllers: [FilmController],
	providers: [FilmService],
	exports: [TypeOrmModule],
})
export class FilmModule {}

