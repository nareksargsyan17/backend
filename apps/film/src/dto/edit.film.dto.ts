import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class EditFIlm {
	@ApiProperty({description : "edit film original name"})
	@IsString()
	@IsOptional()
	nameOriginal: string;

	@ApiProperty({description : "edit film russian name"})
	@IsOptional()
	@IsString()
	nameRu: string;
}