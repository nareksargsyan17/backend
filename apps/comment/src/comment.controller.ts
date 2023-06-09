import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommentService } from './comment.service';
import { EventPattern } from '@nestjs/microservices';
import { CreateComment } from './dto/create.comment.dto';

@Controller()
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @EventPattern('comment/create')
  async createCom(createComment: CreateComment) {
    return await this.commentService.createCom(createComment);
  }

  @EventPattern('comment/:id')
  async getComment(id: number) {
    console.log(id);
    return await this.commentService.getComment(id);
  }
}
