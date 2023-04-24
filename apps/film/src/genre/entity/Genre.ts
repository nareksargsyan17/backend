import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Film } from "../../entity/Film";

@Entity("genre")
export class Genre{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name : string

    @Column({default : 0})
    first : number

    @ManyToMany(()=> Film, (film) => film.genres)
    films : Film[]
}