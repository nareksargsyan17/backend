import { Film } from "apps/film/src/entity/Film";
import { User } from "apps/user/src/entity/User";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("comment")
export class Comment{
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    comment : string;

    @CreateDateColumn()
    createdAt : Date

    @Column({nullable : true})
    commentId : number;

    @ManyToOne(()=>User, user => user.comments)
    user : User;

    @ManyToOne(()=>Film, film => film.comments, { 
		onDelete: 'CASCADE' 
	})
    film : Film
}