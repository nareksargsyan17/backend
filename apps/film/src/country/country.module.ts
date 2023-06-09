import { Module } from '@nestjs/common';
import { CountryService } from './country.service';
import { CountryController } from './country.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Country } from './entity/Country';
import { DatabaseModule } from '@app/common/database/database.module';

@Module({
  imports: [TypeOrmModule.forFeature([Country]), DatabaseModule],
  providers: [CountryService],
  controllers: [CountryController],
})
export class CountryModule {}
