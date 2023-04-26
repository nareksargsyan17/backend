import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { PersonfilmsService } from './personfilms.service';

@Controller('personfilms')
export class PersonfilmsController {

    constructor(
        private personFilmService : PersonfilmsService
    ){}

    @EventPattern("create")
    async create(data: Array<object>){
        return await this.personFilmService.create(data)
    }

}
