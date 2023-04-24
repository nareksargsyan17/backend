import { Body, Controller, Get, Post } from '@nestjs/common';
import { PersonService } from './person.service';
import { CreatePerson } from './dto/create.person.dto';

@Controller()
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Get()
  getHello(): string {
    return this.personService.getHello();
  }

  @Post("create")
  async createPerson(@Body() createDto : CreatePerson){
    console.log(createDto);
    return await this.personService.create(createDto)
  }
}
