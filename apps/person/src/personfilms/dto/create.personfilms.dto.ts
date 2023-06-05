import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { Role } from '../../entity/Role';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePersonFilm {
	@ApiProperty({description : "film Id", example : 8})
	@IsNumber()
	filmId: number;


	@ApiProperty({description : "person Id", example : 10})
	@IsNumber()
	personId: number;

	@ApiProperty({description : "person role in this film", example : Role})
	@IsNumber()
	role: Role;

	@ApiProperty({description : "person in general or not?", example : false})
	@IsBoolean()
	general: boolean;
}
