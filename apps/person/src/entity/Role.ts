import {
	Column,
	Entity,
	JoinTable,
	ManyToMany,
	ManyToOne,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { PersonFilm } from '../personfilms/entity/PersonFilm';

@Entity('role')
export class Role {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	key: string;

	@OneToMany(() => PersonFilm, (person) => person.role)
	person: PersonFilm[];
}
