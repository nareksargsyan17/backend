import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Film } from './entity/Film';
import { Between, In, Like, MoreThanOrEqual, Repository } from 'typeorm';
import { CreateFilm } from './dto/create.film.dto';
import { Genre } from './genre/entity/Genre';
import { raw } from 'express';
import { defaultIfEmpty } from 'rxjs';
import { getDefaultSettings } from 'http2';

@Injectable()
export class FilmService {
	constructor(
		@InjectRepository(Film) private filmRepository: Repository<Film>,
		@InjectRepository(Genre) private genreRepository: Repository<Genre>,
	) {}
	async getBySearch(searchBy: object) {
		return await this.filmRepository.find({
			where: [
				{ nameOriginal: Like(`%${searchBy['option']}%`) },
				{ nameRu: Like(`%${searchBy['option']}%`) },
				{ genres: { name: Like(`%${searchBy['option']}%`) } },
				{ countries: { name: Like(`%${searchBy['option']}%`) } },
			],
			relations: {
				genres: true,
				countries: true,
			},
		});
	}

	async getByFilter(filterBy: any) {
		return await this.filmRepository.find({
			where: {
				genres: {
					id: filterBy.genre ? In(filterBy.genre.split(',')) : null,
				},
				countries: {
					id: filterBy.country ?  In(filterBy.country.split(",")) : null,
				},
				rating : filterBy.rating ?  MoreThanOrEqual(filterBy.rating) : null,
				year : filterBy.year ? Between(filterBy.year.split(",")[0], filterBy.year.split(",")[1] ? filterBy.year.split(",")[1] : new Date().getFullYear()) : null
			},
			relations: {
				genres: true,
				countries: true,
			},
			order : filterBy.sort ? {
				ratingCount : filterBy.sort == "rcount" ? "DESC"  : null
			} : null
		});
	}

	async create(createFilm: CreateFilm) {
		return await this.filmRepository.save(createFilm);
	}

	async getById(id: number) {
		let res = await this.filmRepository.findOne({
			where: { id: id },
			relations: {
				genres: true,
				countries: true,
				personsfilm: {
					role: true,
				},
			},
			select: {
				personsfilm: {
					personId: true,
					nameOriginal: true,
					nameRu: true,
					personUrl: true,
					general: true,
					role: {
						id: true,
						name: true,
						key: true,
					},
				},
			},
		});
		return res;
	}
}
