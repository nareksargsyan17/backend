import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Film } from "./Film";

@Entity("badge")
export class Badge{
    @PrimaryGeneratedColumn()
    id : number;

    @Column({
		type: 'enum',
		enum: ["red", "gray", "orange", "green"],
		default: "gray"
	})
    type: string;

    @Column()
    content : string

    @OneToMany(()=>Film, (film)=>film.badge)
    films : Film[]
}