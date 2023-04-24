import { Module } from '@nestjs/common';
import { PersonController } from './person.controller';
import { PersonService } from './person.service';
import { RmqModule } from 'libs/common/rmq/rmq.module';
import { DatabaseModule } from '@app/common/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from './entity/Person';

@Module({
  imports: [
    TypeOrmModule.forFeature([Person]),
    DatabaseModule,
    RmqModule
  ],
  controllers: [PersonController],
  providers: [PersonService],
})
export class PersonModule {}
