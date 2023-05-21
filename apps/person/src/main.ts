import { NestFactory } from '@nestjs/core';
import { PersonModule } from './person.module';
import { RmqService } from 'libs/common/rmq/rmq.service';

async function bootstrap() {
	const app = await NestFactory.create(PersonModule);
	const rmqService = app.get<RmqService>(RmqService);
	app.connectMicroservice(rmqService.getOptions('FILM'));
	app.connectMicroservice(rmqService.getOptions('USER'));

	await app.startAllMicroservices();
	await app.listen(3040);
}
bootstrap();
