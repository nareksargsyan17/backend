import { Module } from '@nestjs/common';
import { PersonController } from './person.controller';
import { PersonService } from './person.service';
import { RmqModule } from 'libs/common/rmq/rmq.module';
import { DatabaseModule } from '@app/common/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from './entity/Person';
import { PersonfilmsModule } from './personfilms/personfilms.module';
import { Role } from './entity/Role';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Person, Role]),
    DatabaseModule,
    PersonfilmsModule,
    RmqModule,
  ],
  controllers: [PersonController],
  providers: [PersonService, JwtService],
  exports: [TypeOrmModule],
})
export class PersonModule {}
