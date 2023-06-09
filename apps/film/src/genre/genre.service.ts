import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Genre } from './entity/Genre';
import { EditGenre } from './dto/editGenre.dto';

@Injectable()
export class GenreService {
  constructor(
    @InjectRepository(Genre) private genreRepository: Repository<Genre>,
  ) {}

  async editGenre(id: number, genreDto: EditGenre) {
    try {
      await this.genreRepository.update(id, genreDto);
      return 'updated';
    } catch (e) {
      return e;
    }
  }

  async getAll() {
    return await this.genreRepository.find();
  }
}
