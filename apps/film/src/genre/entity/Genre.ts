import {
	Column,
	Entity,
	JoinTable,
	ManyToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Film } from '../../entity/Film';

@Entity('genre')
export class Genre {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	genre: string;

	@ManyToMany(() => Film, (film) => film.genres)
	films: Film[];
}
