import { Module } from '@nestjs/common';
import { PersonfilmsService } from './personfilms.service';
import { PersonfilmsController } from './personfilms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonFilm } from './entity/PersonFilm';
import { DatabaseModule } from '@app/common/database/database.module';

@Module({
  imports: [TypeOrmModule.forFeature([PersonFilm]), DatabaseModule],
  providers: [PersonfilmsService],
  controllers: [PersonfilmsController],
})
export class PersonfilmsModule {}
