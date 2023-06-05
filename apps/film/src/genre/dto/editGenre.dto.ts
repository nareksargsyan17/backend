import { IsNotEmpty, IsString } from "class-validator";

export class EditGenre{
    @IsNotEmpty()
	@IsString()
    genre : string
}