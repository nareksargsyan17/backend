import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Film } from './entity/Film';
import {
  Between,
  FindOptionsOrder,
  In,
  Like,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { CreateFilm } from './dto/create.film.dto';
import { Genre } from './genre/entity/Genre';
import { EditFIlm } from './dto/edit.film.dto';
import { Filter } from './dto/filter.dto';
import { Search } from './dto/search.dto';
import { Evaluate } from './dto/evaluate.dto';
import { GetFilm } from './dto/get.film.dto';

@Injectable()
export class FilmService {
  constructor(
    @InjectRepository(Film) private filmRepository: Repository<Film>,
    @InjectRepository(Genre) private genreRepository: Repository<Genre>,
  ) {}
  async getBySearch(searchBy: Search) {
    return await this.filmRepository.find({
      where: [
        { nameOriginal: Like(`%${searchBy['option']}%`) },
        { nameRu: Like(`%${searchBy['option']}%`) },
        { genres: { genre: Like(`%${searchBy['option']}%`) } },
        { countries: { name: Like(`%${searchBy['option']}%`) } },
      ],
      select: {
        id: true,
        nameOriginal: true,
        nameRu: true,
        year: true,
      },
    });
  }

  async getByFilter(filterBy: Filter) {
    function sorting(sort: string): FindOptionsOrder<object> {
      if (sort == 'rating') {
        return { rating: 'DESC' };
      } else if (sort == 'rcount') {
        return { ratingCount: 'DESC' };
      } else if (sort == 'year') {
        return { year: 'ASC' };
      } else if (sort == 'abc') {
        return { nameOriginal: 'ASC' };
      }
    }
    console.log(filterBy);
    return await this.filmRepository.find({
      where: {
        genres: {
          id: filterBy.genre ? In(filterBy.genre.split(',')) : null,
        },
        countries: {
          id: filterBy.country ? In(filterBy.country.split(',')) : null,
        },
        rating: filterBy.rating ? MoreThanOrEqual(filterBy.rating) : null,
        year: filterBy.year
          ? Between(
              parseInt(filterBy.year.split(',')[0]),
              filterBy.year.split(',')[1]
                ? parseInt(filterBy.year.split(',')[1])
                : new Date().getFullYear(),
            )
          : null,
      },
      relations: {
        countries: true,
        genres: true,
      },
      select: {
        nameOriginal: true,
        nameRu: true,
        id: true,
        filmLength: true,
        logoUrl: true,
        coverUrl: true,
        year: true,
        rating: true,
        ratingAgeLimits: true,
      },

      order: filterBy.sort ? sorting(filterBy.sort) : null,
    });
  }

  async create(createFilm: CreateFilm) {
    return await this.filmRepository.save(createFilm);
  }

  async getById(id: number) {
    let res: GetFilm = await this.filmRepository.findOne({
      where: { id: id },
      relations: {
        genres: true,
        countries: true,
        personsfilm: {
          role: true,
          person: true,
        },
        badge: true,
        comments: true,
      },
      select: {
        personsfilm: {
          personId: true,
          role: {
            name: true,
            key: true,
          },
          general: true,
          person: {
            nameOriginal: true,
            nameRu: true,
            url: true,
          },
        },
      },
    });
    return res;
  }

  async getComments(id: number) {
    const res = await this.filmRepository.findOne({
      where: { id },
      relations: {
        comments: {
          user: true,
          film: true,
        },
      },
      select: {
        comments: {
          id: true,
          comment: true,
          commentId: true,
          createdAt: true,
          user: {
            id: true,
            firstName: true,
            lastName: true,
          },
          film: {
            id: true,
            nameOriginal: true,
            nameRu: true,
            rating: true,
          },
        },
      },
    });
    return res.comments;
  }

  async evaluate(info: Evaluate) {
    let data = await this.filmRepository.findOne({ where: { id: info.id } });
    data.rating = parseFloat(
      (
        (data.rating * data.ratingCount + info.rating) /
        ++data.ratingCount
      ).toFixed(1),
    );
    await this.filmRepository.update(info.id, data);
    console.log(data.rating);
    return {
      rating: data.rating,
      rcount: data.ratingCount,
    };
  }

  async deleteFilm(id: number) {
    try {
      await this.filmRepository.delete(id);
      return 'deleted ' + id;
    } catch (e) {
      return e;
    }
  }

  async editFilm(id: number, editFilmDto: EditFIlm) {
    try {
      await this.filmRepository.update(id, editFilmDto);
      return 'updated';
    } catch (e) {
      return e;
    }
  }
}
