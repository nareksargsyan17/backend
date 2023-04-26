import { Film } from "apps/film/src/entity/Film";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity("person")
export class Person{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    nameOriginal : string;
    

    @ManyToMany(()=> Film, (film) => film.persons)
    @JoinTable()
    films : Film[]
}