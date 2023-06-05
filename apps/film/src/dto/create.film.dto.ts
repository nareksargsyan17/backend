import { Country } from '../country/entity/Country';
import { Genre } from '../genre/entity/Genre';
import { PersonFilm } from 'apps/person/src/personfilms/entity/PersonFilm';
import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Badge } from '../entity/Badge';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFilm {
	@ApiProperty({ description: 'Film original name', example: "1+1" })
	@IsNotEmpty()
	@IsString()
	nameOriginal: string;

	@ApiProperty({ description: 'Film Russian name', example: "1+1" })
	@IsString()
	@IsOptional()
	nameRu: string;

	@ApiProperty({description: 'https://www.youtube.com/watch?v=tTwFeGArcrs --> watch?v= -> embed/ ->  https://www.youtube.com/embed/tTwFeGArcrs', example: "https://www.youtube.com/embed/tTwFeGArcrs", title :  'Trailer for Film on YouTube'})
	@IsOptional()
	@IsString()
	url : string;

	@ApiProperty({ description: 'Film logo image' })
	@IsOptional()
	@IsString()
	logoUrl: string;

	@ApiProperty({ description: 'Film cover image' })
	@IsOptional()
	@IsString()
	coverUrl: string;

	@ApiProperty({ description: 'Film minutes count' })
	@IsOptional()
	@IsNumber()
	filmLength: number;

	@ApiProperty({ description: 'Film rating' })
	@IsOptional()
	@IsNumber()
	rating: number;

	@ApiProperty({ description: 'Film rating count' })
	@IsOptional()
	@IsNumber()
	ratingCount: number;


	@ApiProperty({ description: 'Film year' })
	@IsOptional()
	@IsNumber()
	year: number;


	@ApiProperty({ description: 'Film slogan' })
	@IsOptional()
	@IsString()
	slogan: string;

	@ApiProperty({ description: 'Film description' })
	@IsOptional()
	@IsString()
	description: string;

	@ApiProperty({ description: 'Film short description' })
	@IsOptional()
	@IsString()
	shortDescription: string;


	@ApiProperty({ description: 'Film type', example:"FILM" })
	@IsOptional()
	@IsString()
	type: string;


	@ApiProperty({ description: 'Film ratingMpaa' })
	@IsOptional()
	@IsString()
	ratingMpaa: string;

	@ApiProperty({ description: 'Film age limit' })
	@IsOptional()
	@IsString()
	ratingAgeLimits: string;

	@ApiProperty({ description: 'Film type-serial or not' })
	@IsBoolean()
	@IsOptional()
	serial: boolean;


	
	@ApiProperty({ description: 'Film genres array of objects', example : [{id:3},{id:6}] })
	@IsOptional()
	@IsArray()
	genres: Genre[];

	@ApiProperty({ description: 'Film countries array of objects', example : [{id:3},{id:1}] })
	@IsOptional()
	@IsArray()
	countries: Country[];

	@ApiProperty({ description: 'Film persons array of objects', example : [{personId:6,general : true, role : 5}] })
	@IsOptional()
	@IsArray()
	persons: PersonFilm[];


	@ApiProperty({ description: 'Film badge id', example :2 })
	@IsOptional()
	@IsNumber()
	badge: Badge;
}
