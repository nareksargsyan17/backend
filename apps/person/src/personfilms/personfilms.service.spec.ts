import { Test, TestingModule } from '@nestjs/testing';
import { PersonfilmsService } from './personfilms.service';

describe('PersonfilmsService', () => {
	let service: PersonfilmsService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [PersonfilmsService],
		}).compile();

		service = module.get<PersonfilmsService>(PersonfilmsService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
