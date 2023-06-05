import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";

export class Filter{
    @ApiProperty({description : "genres id in string ", example : "1,2,3,4", required : false})
    @IsOptional()
    @IsString()
    genre : string;

    @ApiProperty({description : "year in string, you can use two parametrs or one, if used two, so you saw beetwen first to second years", example : "2005, 2010", required : false})
    @IsOptional()
    @IsString()
    year : string;

    @ApiProperty({description : "countries id in string which required", example : "1,2", required : false}) 
    @IsOptional()
    @IsString()
    country : string;

    @ApiProperty({description : "minimum rating", example : 7.5, required : false})
    @IsOptional()
    rating : number;

    @ApiProperty({description : "for sorting(enum)", enum : ["rating", "year", "abc"], required : false})
    @IsOptional()
    @IsString()
    sort : string
}