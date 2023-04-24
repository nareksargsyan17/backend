import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { FilmService } from './film.service';
import { CreateFilm } from './dto/create.film.dto';

@Controller("film")
export class FilmController {
  constructor(private readonly filmService: FilmService) {}

  @Get()
  getHello(): string {
    console.log("aaaaa");
    return this.filmService.getHello();
  }

  @Post("create")
  async create(@Body() createFilm : CreateFilm){
    return await this.filmService.create(createFilm)
  }

  @Get(":id")
  async get(@Param("id") id : number){
    console.log(id);
    return await this.filmService.getById(id)
  }
}

