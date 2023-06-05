import {  Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entity/Comment';
import { Repository } from 'typeorm';
import { CreateComment } from './dto/create.comment.dto';

@Injectable()
export class CommentService {
  constructor(@InjectRepository(Comment) private readonly commentRepository : Repository<Comment>){}


  async createCom(createComment : CreateComment){
    return await this.commentRepository.save(createComment)
  }

  async getComment(id : number){
    return await this.commentRepository.find(
      {
        where : [
          {id : id},
          {commentId : id}
        ]
    });
  }
}
