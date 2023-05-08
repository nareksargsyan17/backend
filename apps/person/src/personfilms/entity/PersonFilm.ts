import { Film } from 'apps/film/src/entity/Film';
import {
	Column,
	Entity,
	JoinColumn,
	JoinTable,
	ManyToMany,
	ManyToOne,
	OneToMany,
	OneToOne,
	PrimaryColumn,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Person } from '../../entity/Person';
import { Role } from '../../entity/Role';

@Entity('person_films_film')
export class PersonFilm {
	@PrimaryColumn()
	personId?: number;

	@PrimaryColumn()
	filmId?: number;

	@Column({ nullable: true })
	nameOriginal: string;

	@Column({ nullable: true })
	nameRu: string;

	@Column({ nullable: true })
	personUrl: string;

	@Column({ nullable: true })
	filmOriginal: string;

	@Column({ nullable: true })
	filmRu: string;

	@Column({ nullable: true })
	filmUrl: string;

	@Column({ default: false, nullable: true })
	general: boolean;

	@ManyToOne(() => Role, (role) => role.person)
	@JoinColumn()
	role: Role;

	@ManyToOne(() => Film, (film) => film.personsfilm)
	film: Film;

	@ManyToOne(() => Person, (person) => person.filmPersons)
	person: Person;
}
