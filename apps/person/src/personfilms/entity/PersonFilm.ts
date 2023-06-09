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

  @Column({ default: false })
  general: boolean;

  @ManyToOne(() => Role, (role) => role.person)
  @JoinColumn()
  role: Role;

  @ManyToOne(() => Film, (film) => film.personsfilm, {
    onDelete: 'CASCADE',
  })
  film: Film;

  @ManyToOne(() => Person, (person) => person.filmPersons)
  person: Person;
}
