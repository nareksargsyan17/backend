import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity("user")
export class User{
    @PrimaryGeneratedColumn()
    id : number;

    @Column({unique : true})
    email : string;

    @Column({nullable : true})
    password: string;

    @Column({default : false})
    role : boolean;

    @Column()
    firstName : string;

    @Column()
    lastName : string;

    @Column({default : null})
    gKey: string

}