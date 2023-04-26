import { NestFactory } from '@nestjs/core';
import { FilmModule } from './film.module';
import { RmqService } from 'libs/common/rmq/rmq.service';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { FilmService } from './film.service';

async function bootstrap() {
  const app = await NestFactory.create(FilmModule);
  //     console.log("working");
//   axios.get('https://kinopoiskapiunofficial.tech/api/v1/staff/250', {
//     headers: {
//         'X-API-KEY': '421efafd-afa4-4654-8961-0615f47d0797',
//         'Content-Type': 'application/json',
//     },
// })
//     .then(json  => {
//       console.dir(json.data);
//       // const filmService = app.get(FilmService)
//         // filmService.create(json.data)
//       })
//       .catch(err => console.log(err))
      
      await app.listen(3030, ()=>{console.log("Aa")})
    }
bootstrap();
