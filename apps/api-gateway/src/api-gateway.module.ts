import { Module } from '@nestjs/common';
import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';
import { DatabaseModule } from '@app/common/database/database.module';
import { RmqModule } from 'libs/common/rmq/rmq.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilmModule } from 'apps/film/src/film.module';
import { JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'apps/user/src/user.module';
import { GoogleStrategy } from 'apps/user/src/Strategy/Google/GoogleStrategy';
import { SessionSerializer } from 'apps/user/src/Strategy/Google/Serializer';
import { CommentModule } from 'apps/comment/src/comment.module';
import { PersonModule } from 'apps/person/src/person.module';

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
    RmqModule.register({ name: 'FILM' }),
    TypeOrmModule,
    FilmModule,
    PassportModule.register({ session: true }),
    UserModule,
    CommentModule,
    PersonModule
  ],
  controllers: [ApiGatewayController],
  providers: [ApiGatewayService, JwtService, GoogleStrategy, SessionSerializer,],
  exports : [TypeOrmModule]
})
export class ApiGatewayModule {}
