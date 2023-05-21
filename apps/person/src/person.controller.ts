import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { PersonService } from './person.service';
import { CreatePerson } from './dto/create.person.dto';
import {
	Ctx,
	EventPattern,
	MessagePattern,
	Payload,
	RmqContext,
} from '@nestjs/microservices';
import { RmqService } from 'libs/common/rmq/rmq.service';

@Controller('person')
export class PersonController {
	constructor(private readonly personService: PersonService) {}

	@Get(':id')
	async getPerson(@Param('id') id: number) {
		return await this.personService.getPerson(id);
	}

	@EventPattern('search')
	async getPersonBy(searchBy: object) {
		return await this.personService.getPersonBy(searchBy);
	}

	@Post('create')
	async createPerson(@Body() createDto: CreatePerson) {
		await this.personService.create(createDto);
		return 'yes';
	}
}
