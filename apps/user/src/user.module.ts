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
import { PassportModule } from '@nestjs/passport';
import { SessionSerializer } from './Strategy/Google/Serializer';
import { GoogleStrategy } from './Strategy/Google/GoogleStrategy';

@Module({
  imports: [
    ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: './apps/user/src/.env',
			validationSchema: Joi.object({
				RABBITMQ_URI: Joi.string().required(),
				RABBITMQ_USER_QUEUE: Joi.string().required(),
			}),
		}),
    DatabaseModule,
    TypeOrmModule.forFeature([User]),
    RmqModule.register({name: "USER"}),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('SECRET-JWT'),
        signOptions : {expiresIn : "1h"}
      }),
      inject: [ConfigService],}),
      PassportModule.register({ session: true }),
  ],
  controllers: [UserController],
  providers: [GoogleStrategy, UserService, SessionSerializer],
	exports: [TypeOrmModule],

})
export class UserModule {}
