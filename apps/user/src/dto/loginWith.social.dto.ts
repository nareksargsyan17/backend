import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class DetailsUser {

    @IsNotEmpty()
    @IsString()
    firstName : string;

    @IsNotEmpty()
    @IsString()
    lastName : string;

    @IsEmail()
    email ?: string;

    @IsString()
    socialKey ?: string;
}