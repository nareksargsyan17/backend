import { NestFactory } from '@nestjs/core';
import { FilmModule } from './film.module';
import axios from 'axios';
import { PersonService } from 'apps/person/src/person.service';
import { FilmService } from './film.service';
import { date } from 'joi';
import * as cookieParser from 'cookie-parser';
import { RmqService } from 'libs/common/rmq/rmq.service';
import { Person } from 'apps/person/src/entity/Person';
import { PersonfilmsService } from 'apps/person/src/personfilms/personfilms.service';

async function bootstrap() {
	const app = await NestFactory.create(FilmModule, {cors : true});
	app.use(cookieParser());
	const rmqService = app.get<RmqService>(RmqService);
	app.connectMicroservice(rmqService.getOptions('FILM'));

	let count = 5040

	setInterval(async ()=>{
		await kinopoiskPerson(count);
		count++;
	}, 1001)
// axios.get(
// 	  'https://kinopoiskapiunofficial.tech/api/v2.2/films?order=RATING&type=ALL&ratingFrom=6&ratingTo=10',{
// headers: {
// 										'X-API-KEY': '421efafd-afa4-4654-8961-0615f47d0797',
// 										'Content-Type': 'application/json',
// 									}}).then(async (data)=>{
// 										let i = 15
// 										setInterval(async ()=>{
// 											for(let j = i; j< i+5; j++){
// 												await kinopoiskPerson(data.data.items[j].kinopoiskId);
	
// 											}
// 											i = i +5
// 										}, 1005)
// 										console.log(data.data);
// 									})
	async function kinopoiskPerson(filmId : any) {
		axios
			.get(
				`https://kinopoiskapiunofficial.tech/api/v2.2/films/${filmId}`,
				{
					headers: {
						'X-API-KEY': 'd03c1515-0f43-476a-a03b-9d868285347c',
						'Content-Type': 'application/json',
					},
				},
			)
			.then((json) => {
				console.log(json.data);
				axios
			.get(
				`https://kinopoiskapiunofficial.tech/api/v2.2/films/${filmId}/videos`,
				{
					headers: {
						'X-API-KEY': 'd03c1515-0f43-476a-a03b-9d868285347c',
						'Content-Type': 'application/json',
					},
				},
			).then(async data=>{
				let url:any;
				if(data.data.items.find(elem=> elem.site == 'YOUTUBE')){
					url = data.data.items.find(elem=> elem.site == 'YOUTUBE').url.split("watch?v=")[0].split("/v/")
					console.log(url);
					url[2]=url[1];
					url[1] = "/embed/"
					url = url.join("")
				}else{
					url = 'https://www.youtube.com/embed/tTwFeGArcrs'
				}
				let genre = []
				let id2 = Math.floor(Math.random() * 13)+1
				genre[0] = {
					id : id2
				}
				genre[1] = {
					id : id2>1 ? id2-1 : id2+1
				}
				let country = []
				let id1 = Math.floor(Math.random() * 5)+1
				country[0] = {
					id : id1
				}
				country[1] = {
					id : id1>1?id1-1:id1+1
				}

				
				const {ratingKinopoisk, ratingKinopoiskVoteCount,countries, genres, ...obj} = json.data;
				const filmService = app.get(FilmService)
				const personService = app.get(PersonfilmsService)
				let {id} = await filmService.create({
					rating : ratingKinopoisk? parseFloat(ratingKinopoisk): 5,
					ratingCount : ratingKinopoiskVoteCount ? parseInt(ratingKinopoiskVoteCount):50,
					url : 'https://www.youtube.com/embed/tTwFeGArcrs',
					genres : genre,
					countries : country,
					badge : Math.floor((Math.random()*4))+1,
					...obj
				})
				let person = [];
				person[0] = {
					filmId : id,
					personId : Math.floor(Math.random() * 151)+39,
					role : 1,
					general : true
				}
				person[1] = {
					filmId : id,
					personId : Math.floor(Math.random() * 151)+39 == person[0].personId ? 100: 43,
					role : 2,
					general : false
				}
				await personService.create(person)
			})
		})
		}
// 			// 	for (let i = 0; i < 10; i++) {
// 			// 		axios
// 			// 			.get(
// 			// 				`https://kinopoiskapiunofficial.tech/api/v1/staff/${json.data[i].staffId}`,
// 			// 				{
// 			// 					headers: {
// 			// 						'X-API-KEY': '421efafd-afa4-4654-8961-0615f47d0797',
// 			// 						'Content-Type': 'application/json',
// 			// 					},
// 			// 				},
// 			// 			)
// 			// 			.then((json) => {
// 			// 				console.log(filmId);
// 			// 				const {
// 			// 					nameRu,
// 			// 					nameEn,
// 			// 					birthday,
// 			// 					birthplace,
// 			// 					growth,
// 			// 					death,
// 			// 					deathplace,
// 			// 					facts,
// 			// 					sex,
// 			// 					profession,
// 			// 					posterUrl,
// 			// 				} = json.data;
// 			// 				const obj = {
// 			// 					nameRu,
// 			// 					nameOriginal: nameEn,
// 			// 					birthday,
// 			// 					birthplace,
// 			// 					growth,
// 			// 					death,
// 			// 					deathplace,
// 			// 					facts,
// 			// 					sex,
// 			// 					profession,
// 			// 					url: posterUrl,
// 			// 				};
// 			// 				const personService = app.get(PersonService);
// 			// 				personService.create(obj);
// 			// 				if (count >= 430) {
// 			// 					clearInterval(interval);
// 			// 				}
// 			// 			});
// 			// 	}
// 			// };
		



	
	app.enableCors()
}
bootstrap();
