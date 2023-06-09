import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class EditGenre {
  @ApiProperty({ description: 'edit Genre name', example: 'Kriminal' })
  @IsNotEmpty()
  @IsString()
  genre: string;
}
