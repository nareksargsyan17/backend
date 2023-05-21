import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Film } from './entity/Film';
import { Between, FindOptionsOrder, In, Like, MoreThanOrEqual, Repository } from 'typeorm';
import { CreateFilm } from './dto/create.film.dto';
import { Genre } from './genre/entity/Genre';

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
				{ genres: { genre: Like(`%${searchBy['option']}%`) } },
				{ countries: { name: Like(`%${searchBy['option']}%`) } },
			],
			relations: {
				genres: true,
				countries: true,
			},
		});
	}

	async getByFilter(filterBy: any) {
		function sorting(sort:string):FindOptionsOrder<object>{
			if(sort == "rating"){
				return {rating : "DESC"};
			}else if(sort == "rcount"){
				return {ratingCount : "DESC"}
			}else if(sort == "year"){
				return {year : "ASC"}
			}else if(sort == "abc"){
				return {nameOriginal : "ASC"}
			}
		}
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
			order: filterBy.sort ? sorting(filterBy.sort) : null
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


	async evaluate(id: number, rating : number){
		let data = await this.filmRepository.findOne({where : {id : id}})
		data.rating = (data.rating * data.ratingCount + rating)/ ++data.ratingCount;
		await this.filmRepository.update(id, data);
		return {
			rating : data.rating,
			rcount : data.ratingCount
		}
	}
}
