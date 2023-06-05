import { IsString, MinLength, MaxLength, IsEmail, IsNotEmpty, IsBoolean, IsNumber } from "class-validator";


export class CreateUser{

    @IsNotEmpty()
    @IsString()
    firstName : string;


    @IsNotEmpty()
    @IsString()
    lastName : string;

    @IsNumber()
    role : number;

    @IsEmail()
    email : string;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    password: string;
}