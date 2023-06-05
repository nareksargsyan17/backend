import { Film } from 'apps/film/src/entity/Film';
import { PersonFilm } from '../personfilms/entity/PersonFilm';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePerson {
	@ApiProperty({description : "Person Original Name",  example : "David Smith"})
	@IsNotEmpty()
	@IsString()
	nameOriginal: string;


	@ApiProperty({description : "Person Russian Name",  example : "Давид Смит"})
	@IsString()
	@IsOptional()
	nameRu: string;


	@ApiProperty({description : "Person Sex",  enum: ["MALE", "FEMALE"], default : "MALE"})
	@IsOptional()
	@IsString()
	sex: string;


	
	@ApiProperty({description : "Person Photo Url",  example : "https://kinopoiskapiunofficial.tech/images/actor_posters/kp/20198.jpg"})
	@IsOptional()
	@IsString()
	url: string;

	@ApiProperty({description : "Person Growth",  example : 170})
	@IsOptional()
	@IsNumber()
	growth: number;

	@ApiProperty({description : "Person birthplace",  example : "Хьюстон, Техас, США"})
	@IsOptional()
	@IsString()
	birthplace: string;


	@ApiProperty({description : "Person birthplace",  example : "1977-04-30"})
	@IsOptional()
	@IsString()
	birthday: string;

	@ApiProperty({description : "Person birthplace",  example : "30"})
	@IsOptional()
	@IsNumber()
	age: number;

	
	@ApiProperty({description : "Person birthplace",  example : "2015-06-07"})
	@IsOptional()
	@IsString()
	death: string;
	@IsOptional()
	@IsString()
	deathplace: string;
	@IsOptional()
	@IsString()
	profession: string;
	@IsOptional()
	@IsString()
	facts: string;
	@IsOptional()
	@IsArray()
	filmPersons: PersonFilm[];
}
