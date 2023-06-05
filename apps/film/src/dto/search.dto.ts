import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class Search{

    @ApiProperty({description : "search bar value"})
    @IsOptional()
    @IsString()
    option : string;
}