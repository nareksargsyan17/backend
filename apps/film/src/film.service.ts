import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Film } from './entity/Film';
import { Repository } from 'typeorm';
import { CreateFilm } from './dto/create.film.dto';
import { Genre } from './genre/entity/Genre';

@Injectable()
export class FilmService {
  
  constructor(
    @InjectRepository(Film) private  filmRepository : Repository<Film>,
    @InjectRepository(Genre) private  genreRepository : Repository<Genre>,

    ){}
  getHello(): string {
    return 'Hello World!';
  }

  async create(createFilm : CreateFilm){
    console.dir(await  this.filmRepository.save(createFilm));
    return await  this.filmRepository.save(createFilm)
  }

  async getById(id: number){
    let res = await this.filmRepository.findOne({
      where : {id : id},
      relations :{
        genres: true, 
        countries : true,
        persons : true
      },
      select : {
        genres : {
          name : true,
        }
      }

    })
    return res
  }
}
