import { Film } from 'apps/film/src/entity/Film';
import {
	Column,
	Entity,
	JoinTable,
	ManyToMany,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { PersonFilm } from '../personfilms/entity/PersonFilm';

@Entity('person')
export class Person {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	nameOriginal: string;

	@Column({ nullable: true })
	nameRu: string;

	@Column()
	sex: string;

	@Column({ nullable: true })
	url: string;

	@Column({ nullable: true })
	growth: number;

	@Column({ nullable: true })
	death: string;

	@Column({ nullable: true })
	deathplace: string;

	@Column({ nullable: true })
	facts: string;

	@Column({ nullable: true })
	profession: string;

	@Column({ nullable: true })
	birthplace: string;

	@Column({ nullable: true })
	birthday: string;

	@Column({ nullable: true })
	age: number;

	// @ManyToMany(()=> Film, (film) => film.personData)
	// filmData : Film[]

	@OneToMany(() => PersonFilm, (personfilm) => personfilm.person)
	filmPersons: PersonFilm[];
}
