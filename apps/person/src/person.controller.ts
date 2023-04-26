import { Body, Controller, Get, Post } from '@nestjs/common';
import { PersonService } from './person.service';
import { CreatePerson } from './dto/create.person.dto';
import { Ctx, EventPattern, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { RmqService } from 'libs/common/rmq/rmq.service';

@Controller()
export class PersonController {
  constructor(
    private readonly personService: PersonService,
    ) {}

  @Get()
  getHello(): string {
    return this.personService.getHello();
  }

  @Post("create")
  async createPerson(@Body() createDto : CreatePerson){
    console.log(createDto);
    await this.personService.create(createDto)
    return "yes"
  }
}
