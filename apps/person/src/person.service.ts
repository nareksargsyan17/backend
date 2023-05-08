import { Injectable } from '@nestjs/common';
import { CreatePerson } from './dto/create.person.dto';
import { Like, Repository } from 'typeorm';
import { Person } from './entity/Person';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PersonService {
	constructor(
		@InjectRepository(Person)
		private personRepository: Repository<Person>,
	) {}

	async getPerson(id: number) {
		let res = await this.personRepository.findOne({
			where: { id: id },
			relations: {
				filmPersons: {
          role : true
        },
			},
			select: {
				filmPersons: {
					filmId: true,
					filmOriginal: true,
					filmRu: true,
					filmUrl: true,
					general: true,
					role: {
						id: true,
						name: true,
						key: true,
					},
				},
			},
		});
		return res;
	}

	async getPersonBy(searchBy: object) {
		return await this.personRepository.find({
			where: [
				{ nameOriginal: Like(`%${searchBy['option']}%`) },
				{ nameRu: Like(`%${searchBy['option']}%`) },
			],
		});
	}
	async create(createPerson: CreatePerson) {
		createPerson.birthday
			? (createPerson.age =
					new Date().getFullYear() -
					parseInt(createPerson.birthday.slice(0, 5)) -
					1)
			: (createPerson.age = 0);

		return await this.personRepository.save(createPerson);
	}
}
