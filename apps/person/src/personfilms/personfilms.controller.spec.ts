import { Test, TestingModule } from '@nestjs/testing';
import { PersonfilmsController } from './personfilms.controller';

describe('PersonfilmsController', () => {
	let controller: PersonfilmsController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [PersonfilmsController],
		}).compile();

		controller = module.get<PersonfilmsController>(PersonfilmsController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
