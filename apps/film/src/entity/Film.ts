import {
	Column,
	CreateDateColumn,
	Entity,
	JoinTable,
	ManyToMany,
	ManyToOne,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Genre } from '../genre/entity/Genre';
import { Country } from '../country/entity/Country';
import { date } from 'joi';
import { Person } from 'apps/person/src/entity/Person';
import { PersonFilm } from 'apps/person/src/personfilms/entity/PersonFilm';
import { Comment } from 'apps/comment/src/entity/Comment';
import { Badge } from './Badge';

@Entity('film')
export class Film {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	nameOriginal: string;

	@Column({ nullable: true })
	nameRu: string;

	@Column({nullable : true})
	url : string

	@Column({ nullable: true })
	logoUrl: string;

	@Column({ nullable: true })
	coverUrl: string;

	@Column({ nullable: true })
	filmLength: number;

	@Column({ default: 1, type : "decimal"  })
	rating: number;

	@Column({ nullable: true })
	ratingCount: number;

	@Column({ nullable : true})
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

	@CreateDateColumn()
	lastSync: Date;

	@ManyToOne(()=>Badge, (badge)=>badge.films)
    badge : Badge

	@ManyToMany(() => Genre, (genre) => genre.films)
	@JoinTable()
	genres: Genre[];

	@ManyToMany(() => Country, (country) => country.films)
	@JoinTable()
	countries: Country[];

	@OneToMany(() => PersonFilm, (person) => person.film)
	personsfilm: PersonFilm[];


	@OneToMany(()=>Comment, (comment) => comment.film)
	comments : Comment[]
}
