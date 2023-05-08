import { Controller, Get, Param } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { PersonfilmsService } from './personfilms.service';
import { CreatePersonFilm } from './dto/create.personfilms.dto';

@Controller('personfilms')
export class PersonfilmsController {
	constructor(private personFilmService: PersonfilmsService) {}

	@EventPattern('create')
	async create(data: CreatePersonFilm[]) {
		return await this.personFilmService.create(data);
	}

	@Get(':id')
	async getbyId(@Param('id') id: number) {
		return await this.personFilmService.getById(id);
	}
}
