import { Module } from '@nestjs/common';
import { GenreService } from './genre.service';
import { GenreController } from './genre.controller';
import { DatabaseModule } from '@app/common/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Genre } from './entity/Genre';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from 'apps/user/src/guard/Auth.guard';

@Module({
	imports: [TypeOrmModule.forFeature([Genre]), DatabaseModule],
	providers: [GenreService, AuthGuard, JwtService],
	controllers: [GenreController],
})
export class GenreModule {}
