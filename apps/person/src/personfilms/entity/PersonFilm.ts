import { Film } from "apps/film/src/entity/Film";
import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";


@Entity("person_films_film")
export class PersonFilm{
    @PrimaryColumn()
    personId? : number

    @PrimaryColumn()
    filmId? : number

    @Column({default : false, nullable : true})
    general : boolean

    @Column({nullable : true})
    role : string
}