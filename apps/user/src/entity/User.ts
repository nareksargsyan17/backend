import { Comment } from "apps/comment/src/entity/Comment";
import { IsEmail } from "class-validator";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity("user")
export class User{
    @PrimaryGeneratedColumn()
    id : number;

    @Column({unique : true, nullable : true})
    email : string;

    @Column({nullable : true})
    password: string;

    @Column({default : 0})
    role : number;

    @Column()
    firstName : string;

    @Column()
    lastName : string;

    @Column({default : null})
    socialKey: string;


    @OneToMany(()=>Comment, (comment) => comment.user)
	comments : Comment[];
}