import {
	Body,
	Controller,
	Delete,
	Get,
	Inject,
	Param,
	Post,
	Query,
} from '@nestjs/common';
import { FilmService } from './film.service';
import { CreateFilm } from './dto/create.film.dto';
import { ClientProxy } from '@nestjs/microservices';

@Controller('film')
export class FilmController {
	constructor(
		@Inject('FILM') private readonly client: ClientProxy,
		private readonly filmService: FilmService,
	) {}

	@Get('search')
	async getBySearch(@Query() searchBy: object) {
		let res = {};
		return new Promise((resolve, reject) => {
			this.client.send('search', searchBy).subscribe((response) => {
				resolve(response);
			});
		}).then(async (response) => {
			res['persons'] = response;
			res['films'] = await this.filmService.getBySearch(searchBy);

			return res;
		});
	}

	@Get('filter')
	async getByFilter(@Query() filterBy: object) {
		return await this.filmService.getByFilter(filterBy);
	}

	@Post('create')
	async create(@Body() createFilm: CreateFilm) {
		const { id, nameOriginal, nameRu, logoUrl } = await this.filmService.create(
			createFilm,
		);
		let dataArr = [];
		createFilm.persons.forEach((elem) => {
			dataArr.push({
				...elem,
				filmId: id,
				filmOriginal: nameOriginal,
				filmRu: nameRu,
				filmUrl: logoUrl,
			});
		});
		this.client.emit('create', dataArr);

		return id;
	}

	@Get(':id')
	async get(@Param('id') id: number) {
		return await this.filmService.getById(id);
	}
}
