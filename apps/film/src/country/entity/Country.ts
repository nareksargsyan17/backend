import {
	Column,
	Entity,
	JoinTable,
	ManyToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Film } from '../../entity/Film';

@Entity('country')
export class Country {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@ManyToMany(() => Film, (film) => film.countries)
	films: Film[];
}
