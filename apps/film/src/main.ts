import { NestFactory } from '@nestjs/core';
import { FilmModule } from './film.module';
import axios from 'axios';
import { PersonService } from 'apps/person/src/person.service';
import { FilmService } from './film.service';
import { date } from 'joi';

async function bootstrap() {
	const app = await NestFactory.create(FilmModule);
	console.log('working');
	// let count = 3002;
	// async function kinopoiskPerson(filmId) {
	// 	axios
	// 		.get(
	// 			`https://kinopoiskapiunofficial.tech/api/v2.2/films/${filmId}`,
	// 			{
	// 				headers: {
	// 					'X-API-KEY': '421efafd-afa4-4654-8961-0615f47d0797',
	// 					'Content-Type': 'application/json',
	// 				},
	// 			},
	// 		)
	// 		.then((json) => {
	// 			console.log(json.data);
	// 			axios
	// 		.get(
	// 			`https://kinopoiskapiunofficial.tech/api/v2.2/films/${filmId}/videos`,
	// 			{
	// 				headers: {
	// 					'X-API-KEY': '421efafd-afa4-4654-8961-0615f47d0797',
	// 					'Content-Type': 'application/json',
	// 				},
	// 			},
	// 		).then(data=>{
	// 			let url:any;
	// 			if(data.data.items.find(elem=> elem.site == 'YOUTUBE')){
	// 				url = data.data.items.find(elem=> elem.site == 'YOUTUBE').url.split("")
	// 				url.splice(24, 1,"embed")
	// 				url = url.join("")
	// 			}else{
	// 				url = null
	// 			}
	// 			console.log(url);
	// 			const {ratingKinopoisk, ratingKinopoiskVoteCount, ...obj} = json.data;
	// 			const filmService = app.get(FilmService)
	// 			filmService.create({
	// 				rating : ratingKinopoisk? parseInt(ratingKinopoisk): null,
	// 				ratingCount : ratingKinopoiskVoteCount ? parseInt(ratingKinopoiskVoteCount):null,
	// 				url : url,
	// 				...obj
	// 			})
	// 		})
	// 	})
	// 	}
	// 			for (let i = 0; i < 10; i++) {
	// 				axios
	// 					.get(
	// 						`https://kinopoiskapiunofficial.tech/api/v1/staff/${json.data[i].staffId}`,
	// 						{
	// 							headers: {
	// 								'X-API-KEY': '421efafd-afa4-4654-8961-0615f47d0797',
	// 								'Content-Type': 'application/json',
	// 							},
	// 						},
	// 					)
	// 					.then((json) => {
	// 						console.log(filmId);
	// 						const {
	// 							nameRu,
	// 							nameEn,
	// 							birthday,
	// 							birthplace,
	// 							growth,
	// 							death,
	// 							deathplace,
	// 							facts,
	// 							sex,
	// 							profession,
	// 							posterUrl,
	// 						} = json.data;
	// 						const obj = {
	// 							nameRu,
	// 							nameOriginal: nameEn,
	// 							birthday,
	// 							birthplace,
	// 							growth,
	// 							death,
	// 							deathplace,
	// 							facts,
	// 							sex,
	// 							profession,
	// 							url: posterUrl,
	// 						};
	// 						const personService = app.get(PersonService);
	// 						personService.create(obj);
	// 						if (count >= 430) {
	// 							clearInterval(interval);
	// 						}
	// 					});
	// 			}
	// 		});
	// }

	// let interval = setInterval(() => {
	// 	kinopoiskPerson(count);
	// 	count++;
	// }, 2002);
// kinopoiskPerson(365)


	
	app.enableCors({
		origin: "http://127.0.0.1:5500",
		credentials: true
	  })
	await app.listen(3030, () => {
		console.log('Aa');
	});
}
bootstrap();
