import {
	Body,
	Controller,
	Delete,
	Get,
	Inject,
	Param,
	Post,
	Put,
	Query,
	UploadedFile,
	UseInterceptors,
} from '@nestjs/common';
import { FilmService } from './film.service';
import { CreateFilm } from './dto/create.film.dto';
import { ClientProxy } from '@nestjs/microservices';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path = require('path');
import { v4 as uuidv4 } from 'uuid';
import { number } from 'joi';


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
	@UseInterceptors(
		FileInterceptor('image', {
		  storage: diskStorage({
			destination: './apps/film/filmImages/', //creating file in local folder
			filename: (req, image, cb) => {
			  const filename: string =
				path.parse(image.originalname).name.replace(/\s/g, '') + uuidv4(); //originalName+randomwords
			  const extension: string = path.parse(image.originalname).ext;
	
			  cb(null, `${filename}${extension}`);
			},
		  }),
		}),
	  )
	async create(
			@UploadedFile() image: Express.Multer.File,
			@Body() createFilm: CreateFilm
		) {
		createFilm.logoUrl = image ? image.path : null 
		const { id, nameOriginal, nameRu, logoUrl } = await this.filmService.create(
			createFilm,
		);
		let dataArr = [];
		console.log(createFilm.persons);
		createFilm.persons?.forEach((elem) => {
			dataArr.push({
				...elem,
				filmId: id,
				filmOriginal: nameOriginal,
				filmRu: nameRu,
				filmUrl: logoUrl,
			});
		});
		console.log(dataArr);
		this.client.emit('create', dataArr);

		return id;
	}

	@Put("evaluate")
	async evaluate(
		@Body("id") id : number,
		@Body("rating") rating : number
	){
		return await this.filmService.evaluate(id, rating)
	}

	@Get(':id')
	async get(@Param('id') id: number) {
		return await this.filmService.getById(id);
	}
}
