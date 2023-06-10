import { Controller } from '@nestjs/common';
import { CountryService } from './country.service';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class CountryController {

    constructor(private readonly countryService: CountryService) {}


    @EventPattern("country/getAll")
    async getAll(){
        return await this.countryService.getAll();
    }
}
