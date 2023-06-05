import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/User';
import { DatabaseModule } from '@app/common/database/database.module';
import { RmqModule } from 'libs/common/rmq/rmq.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { SessionSerializer } from './Strategy/Google/Serializer';
import { GoogleStrategy } from './Strategy/Google/GoogleStrategy';
import { VKStrategy } from './Strategy/Vk/VkStrategy';
import { SessionSerializerVK } from './Strategy/Vk/Serializer';

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
    TypeOrmModule.forFeature([User]),
    RmqModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('SECRET_JWT'),
        signOptions : {expiresIn : "1h"}
      }),
      inject: [ConfigService],}),
  ],
  controllers: [UserController],
  providers: [GoogleStrategy, UserService, SessionSerializer, VKStrategy, SessionSerializerVK],
	exports: [TypeOrmModule],

})
export class UserModule {}
