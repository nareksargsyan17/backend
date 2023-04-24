import { Injectable } from '@nestjs/common';
import { CreatePerson } from './dto/create.person.dto';
import { Repository } from 'typeorm';
import { Person } from './entity/Person';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(Person)
    private personRepasitory : Repository<Person>){}

  getHello(): string {
    return 'Hello World!';
  }

  async create(createPerson : CreatePerson){
    return await this.personRepasitory.save(createPerson);
  }
}
