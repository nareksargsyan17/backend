import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity("person")
export class Person{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    nameOriginal : string;
    
}