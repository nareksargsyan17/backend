import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { FilmService } from './film.service';
import { CreateFilm } from './dto/create.film.dto';
import { CreatePerson } from 'apps/person/src/dto/create.person.dto';
import { ClientProxy } from '@nestjs/microservices';

@Controller("film")
export class FilmController {
  constructor(
    @Inject("FILM") private readonly client : ClientProxy,
    private readonly filmService: FilmService) {}

  @Get()
  getHello(): string {
    return this.filmService.getHello();
  }

  @Post("create")
  async create(@Body() createFilm : CreateFilm){
    const {id} = await this.filmService.create(createFilm)
    let dataArr = []
    createFilm.persons.forEach(elem=>{
      dataArr.push({...elem, filmId : id})
    })
    this.client.emit("create", dataArr)
    return ""
  }

  @Get(":id")
  async get(@Param("id") id : number){
    console.log(id);
    return await this.filmService.getById(id)
  }
}

