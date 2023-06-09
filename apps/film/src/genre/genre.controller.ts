import {
  Body,
  Controller,
  Param,
  Put,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { GenreService } from './genre.service';
import { Genre } from './entity/Genre';
import { AuthGuard } from '@nestjs/passport';
import { EditGenre } from './dto/editGenre.dto';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @EventPattern('genre/edit/:id')
  async editGenre(data: { id: number; genreDto: EditGenre }) {
    const { id, genreDto } = data;
    return await this.genreService.editGenre(id, genreDto);
  }

  @EventPattern('genre/getAll')
  async genres() {
    return await this.genreService.getAll();
  }
}
