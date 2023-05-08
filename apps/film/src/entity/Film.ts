import {
	Column,
	Entity,
	JoinTable,
	ManyToMany,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Genre } from '../genre/entity/Genre';
import { Country } from '../country/entity/Country';
import { date } from 'joi';
import { ForGenre } from '../genre/genre.dto';
import { Person } from 'apps/person/src/entity/Person';
import { PersonFilm } from 'apps/person/src/personfilms/entity/PersonFilm';

@Entity('film')
export class Film {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	nameOriginal: string;

	@Column({ nullable: true })
	nameRu: string;

	@Column({ nullable: true })
	logoUrl: string;

	@Column({ nullable: true })
	coverUrl: string;

	@Column({ nullable: true })
	filmLength: number;

	@Column({ nullable: true })
	rating: number;

	@Column({ nullable: true })
	ratingCount: number;

	@Column({ type : 'date'})
	year: number;

	@Column({ nullable: true })
	slogan: string;

	@Column({ nullable: true })
	description: string;

	@Column({ nullable: true })
	shortDescription: string;

	@Column({ nullable: true })
	type: string;

	@Column({ nullable: true })
	ratingMpaa: string;

	@Column({ nullable: true })
	ratingAgeLimits: string;

	@Column({ nullable: true })
	serial: boolean;

	@Column({ nullable: true, type: 'date' })
	lastSync: string;

	@ManyToMany(() => Genre, (genre) => genre.films)
	@JoinTable()
	genres: Genre[];

	@ManyToMany(() => Country, (country) => country.films)
	@JoinTable()
	countries: Country[];

	// @ManyToMany(()=> Person, (person) => person.filmData)
	// personData : Person[]

	@OneToMany(() => PersonFilm, (person) => person.film)
	personsfilm: PersonFilm[];
}
