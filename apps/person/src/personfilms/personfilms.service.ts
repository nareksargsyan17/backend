import { Injectable } from '@nestjs/common';
import { PersonFilm } from './entity/PersonFilm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PersonfilmsService {
    constructor(
        @InjectRepository(PersonFilm)
        private personFilmRepasitory : Repository<PersonFilm>){}

    async create(data:Array<object>){

        return await this.personFilmRepasitory.save(data)
    }
}
