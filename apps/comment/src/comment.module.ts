import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { Comment } from './entity/Comment';
import { DatabaseModule } from '@app/common/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RmqModule } from 'libs/common/rmq/rmq.module';

@Module({
  imports: [
    DatabaseModule,
    RmqModule,
		TypeOrmModule.forFeature([Comment]),
  ],
  controllers: [CommentController],
  providers: [CommentService],
  exports : [TypeOrmModule]
})
export class CommentModule {}
