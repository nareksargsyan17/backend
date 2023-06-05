import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateComment{
    @IsNumber()
    @IsOptional()
    commentId ?: number;
    @IsNotEmpty()
    @IsString()
    comment : string;
    @IsNotEmpty()
    @IsNumber()
    filmId : number;
    @IsNumber()
    @IsNotEmpty()
    userId : number
}