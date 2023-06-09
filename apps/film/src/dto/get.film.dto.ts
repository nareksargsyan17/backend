import { Country } from '../country/entity/Country';
import { Genre } from '../genre/entity/Genre';
import { PersonFilm } from 'apps/person/src/personfilms/entity/PersonFilm';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Badge } from '../entity/Badge';
import { ApiProperty } from '@nestjs/swagger';

export class GetFilm {
  @ApiProperty({ description: 'Film original name', example: '1+1' })
  @IsNotEmpty()
  @IsString()
  nameOriginal: string;

  @ApiProperty({ description: 'Film Russian name', example: '1+1' })
  @IsString()
  @IsOptional()
  nameRu: string;

  @ApiProperty({
    description:
      'https://www.youtube.com/watch?v=tTwFeGArcrs --> watch?v= -> embed/ ->  https://www.youtube.com/embed/tTwFeGArcrs',
    example: 'https://www.youtube.com/embed/tTwFeGArcrs',
    title: 'Trailer for Film on YouTube',
  })
  @IsOptional()
  @IsString()
  url: string;

  @ApiProperty({
    description: 'Film logo image',
    example:
      'https://kinopoiskapiunofficial.tech/images/actor_posters/kp/12557.jpg',
  })
  @IsOptional()
  @IsString()
  logoUrl: string;

  @ApiProperty({
    description: 'Film cover image',
    example:
      'https://kinopoiskapiunofficial.tech/images/actor_posters/kp/12557.jpg',
  })
  @IsOptional()
  @IsString()
  coverUrl: string;

  @ApiProperty({ description: 'Film minutes count', example: 100 })
  @IsOptional()
  @IsNumber()
  filmLength: number;

  @ApiProperty({ description: 'Film rating', example: 6 })
  @IsOptional()
  @IsNumber()
  rating: number;

  @ApiProperty({ description: 'Film rating count', example: 500 })
  @IsOptional()
  @IsNumber()
  ratingCount: number;

  @ApiProperty({ description: 'Film year', example: 2000 })
  @IsOptional()
  @IsNumber()
  year: number;

  @ApiProperty({
    description: 'Film slogan',
    example: "Everyone's beautiful in their own way...",
  })
  @IsOptional()
  @IsString()
  slogan: string;

  @ApiProperty({
    description: 'Film description',
    example:
      'Год 1954-й, период драматических социальных перемен, которые Левинсон изучает глазами еврейской семьи Курцманов. Дружба, любовь, рок-н-ролл, отвага, расизм, кадиллаки, Хэллоуин. Времена действительно меняются. Курцманы - и Америка - уже никогда не будут прежними.',
  })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Film short description',
    example:
      'Хан бежит из тюрьмы, чтобы отомстить за брата, но влюбляется в дочь врага. Боевик о борьбе кланов с Джетом Ли',
  })
  @IsOptional()
  @IsString()
  shortDescription: string;

  @ApiProperty({ description: 'Film type', example: 'FILM' })
  @IsOptional()
  @IsString()
  type: string;

  @ApiProperty({ description: 'Film ratingMpaa', example: '6.3' })
  @IsOptional()
  @IsString()
  ratingMpaa: string;

  @ApiProperty({ description: 'Film age limit', example: 'age16' })
  @IsOptional()
  @IsString()
  ratingAgeLimits: string;

  @ApiProperty({ description: 'Film type-serial or not', example: false })
  @IsBoolean()
  @IsOptional()
  serial: boolean;

  @ApiProperty({
    description: 'Film genres array of objects',
    example: [
      {
        id: 2,
        genre: 'Вестерн',
      },
      {
        id: 1,
        genre: 'Боевик',
      },
    ],
  })
  @IsOptional()
  @IsArray()
  genres: Genre[];

  @ApiProperty({
    description: 'Film countries array of objects',
    example: [
      {
        id: 3,
        name: 'Germany',
        nameRu: 'Германия',
      },
      {
        id: 4,
        name: 'New Zealand',
        nameRu: 'Новая Зеландия',
      },
    ],
  })
  @IsOptional()
  @IsArray()
  countries: Country[];

  @ApiProperty({
    description: 'Film persons array of objects',
    example: [
      {
        personId: 60,
        general: true,
        role: {
          name: 'Монтажеры',
          key: 'EDITOR',
        },
        person: {
          nameOriginal: 'Lana Wachowski',
          nameRu: 'Лана Вачовски',
          url: 'https://kinopoiskapiunofficial.tech/images/actor_posters/kp/23330.jpg',
        },
      },
      {
        personId: 43,
        general: false,
        role: {
          name: 'Художники',
          key: 'DESIGN',
        },
        person: {
          nameOriginal: 'Michael J. Pagan',
          nameRu: 'Майкл Дж. Паган',
          url: 'https://kinopoiskapiunofficial.tech/images/actor_posters/kp/64513.jpg',
        },
      },
    ],
  })
  @IsOptional()
  @IsArray()
  personsfilm: PersonFilm[];

  @ApiProperty({
    description: 'Film badge id',
    example: {
      id: 4,
      type: 'orange',
      content: 'эксклюзив',
    },
  })
  @IsOptional()
  @IsNumber()
  badge: Badge;
}
