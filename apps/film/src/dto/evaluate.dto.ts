import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, Max, Min } from "class-validator";

export class Evaluate{

    @ApiProperty({description : "film if for update rating", example : 3})
    @IsNumber()
    id : number;

    @ApiProperty({description : "film rating by user", example : 10})
    @IsNumber()
    @Min(1)
    @Max(10)
    rating : number
}