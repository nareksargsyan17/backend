import { Film } from 'apps/film/src/entity/Film';
import { PersonFilm } from '../personfilms/entity/PersonFilm';

export class CreatePerson {
	nameOriginal: string;
	nameRu: string;
	sex: string;
	url: string;
	growth: number;
	birthplace: string;
	birthday: string;
	age: number;
	death: string;

	deathplace: string;
	profession: string;
	facts: string;

	// filmData : Film[];
	filmPersons: PersonFilm[];
}
