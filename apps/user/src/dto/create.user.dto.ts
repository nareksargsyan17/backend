import { IsString, MinLength, MaxLength } from "class-validator";


export class CreateUser{
    firstName : string;
    lastName : string;
    role : boolean
    email : string;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    password: string;

    gKey : string
}