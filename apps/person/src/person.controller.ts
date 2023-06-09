import { Controller } from '@nestjs/common';
import { PersonService } from './person.service';
import { CreatePerson } from './dto/create.person.dto';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @EventPattern('person/:id')
  async getPerson(id: number) {
    return await this.personService.getPerson(id);
  }

  @EventPattern('person/search')
  async getPersonBy(searchBy: object) {
    return await this.personService.getPersonBy(searchBy);
  }

  @EventPattern('person/create')
  async createPerson(data: { createDto: CreatePerson; image: any }) {
    const { createDto, image } = data;
    createDto.url = image ? image.path : createDto.url;
    return await this.personService.create(createDto);
  }

  @EventPattern('role')
  async getRoles() {
    return await this.personService.getRoles();
  }

  @EventPattern('role/:id')
  async getRole(id: number) {
    return await this.personService.getRole(id);
  }
}
