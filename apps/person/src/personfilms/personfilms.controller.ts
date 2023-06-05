import { Controller, Get, Param } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { PersonfilmsService } from './personfilms.service';
import { CreatePersonFilm } from './dto/create.personfilms.dto';

@Controller()
export class PersonfilmsController {
	constructor(private personFilmService: PersonfilmsService) {}

	@EventPattern('personfilm/create')
	async create(data: CreatePersonFilm[]) {
		console.log(data);
		return await this.personFilmService.create(data);
	}

	@EventPattern('personfilm/:id')
	async getbyId(id: number) {
		return await this.personFilmService.getById(id);
	}
}
