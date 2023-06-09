import { Controller } from '@nestjs/common';
import { FilmService } from './film.service';
import { EventPattern } from '@nestjs/microservices';
import { EditFIlm } from './dto/edit.film.dto';
import { Filter } from './dto/filter.dto';
import { Evaluate } from './dto/evaluate.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller()
export class FilmController {
  constructor(private readonly filmService: FilmService) {}

  @EventPattern('film/search')
  async getBySearch(data: any) {
    const { searchBy, personData } = data;
    let res = {};
    res['persons'] = personData;
    res['films'] = await this.filmService.getBySearch(searchBy);

    return res;
  }

  @EventPattern('film/filter')
  async getByFilter(filterBy: Filter) {
    return await this.filmService.getByFilter(filterBy);
  }

  @EventPattern('film/create')
  async create(data: any) {
    const { createFilm, image } = data;
    createFilm.logoUrl = image ? image.path : createFilm.logoUrl;
    const { id } = await this.filmService.create(createFilm);
    let dataArr = [];
    createFilm.persons?.forEach((elem: any) => {
      dataArr.push({
        ...elem,
        filmId: id,
      });
    });

    return dataArr;
  }

  @EventPattern('film/evaluate')
  async evaluate(data: Evaluate) {
    return await this.filmService.evaluate(data);
  }

  @EventPattern('film/:id')
  async get(id: number) {
    return await this.filmService.getById(id);
  }

  @EventPattern('film/:id/comments')
  async getComments(id: number) {
    return await this.filmService.getComments(id);
  }

  @EventPattern('film/delete/:id')
  async deleteFilm(id: number) {
    return await this.filmService.deleteFilm(id);
  }

  @EventPattern('film/edit/:id')
  async editFilm(data: { id: number; editFilmDto: EditFIlm }) {
    const { id, editFilmDto } = data;
    return await this.filmService.editFilm(id, editFilmDto);
  }
}
