import { Injectable } from '@nestjs/common';
import { PersonFilm } from './entity/PersonFilm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePersonFilm } from './dto/create.personfilms.dto';

@Injectable()
export class PersonfilmsService {
	constructor(
		@InjectRepository(PersonFilm)
		private personFilmRepasitory: Repository<PersonFilm>,
	) {}

	async create(data: CreatePersonFilm[]) {
		
		return await this.personFilmRepasitory.save(data);
	}
	async getById(id: number) {
		return await this.personFilmRepasitory.findOne({
			where: { personId: id },
			relations: {
				role: true,
			},
		});
	}
}
