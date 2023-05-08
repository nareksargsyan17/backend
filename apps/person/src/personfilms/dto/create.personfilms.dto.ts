import { Role } from '../../entity/Role';

export class CreatePersonFilm {
	filmId: number;
	personId: number;
	nameOriginal: string;
	nameRu: string;
	personUrl: string;
	filmOriginal: string;
	filmRu: string;
	filmUrl: string;
	role: Role;
	general: boolean;
}
