import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Country } from './entity/Country';
import { Repository } from 'typeorm';

@Injectable()
export class CountryService {
    constructor(
        @InjectRepository(Country) private readonly countryRepository : Repository<Country>
    ){}

    async getAll(){
        return await this.countryRepository.find()
    }
}
