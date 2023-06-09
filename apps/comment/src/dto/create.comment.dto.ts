import { ApiProperty } from '@nestjs/swagger';
import { Film } from 'apps/film/src/entity/Film';
import { User } from 'apps/user/src/entity/User';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateComment {
  @ApiProperty({ description: 'Comment Id, which belongs to him ', example: 2 })
  @IsNumber()
  @IsOptional()
  commentId?: number;

  @ApiProperty({ description: 'Comment content', example: 'Woooooow!' })
  @IsNotEmpty()
  @IsString()
  comment: string;

  @ApiProperty({ description: 'film Id for comment', example: 1000 })
  @IsNotEmpty()
  @IsNumber()
  film: Film;

  @ApiProperty({ description: 'user Id for comment', example: 10 })
  @IsNotEmpty()
  @IsNumber()
  user: User;
}
