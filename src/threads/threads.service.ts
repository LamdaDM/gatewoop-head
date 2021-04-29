import { Injectable } from '@nestjs/common';
import { CommentsRepository } from 'src/comments/repositories/comments.repository';
import { CreateThreadDto } from './dto/create-thread.dto';
import { UpdateThreadDto } from './dto/update-thread.dto';
import { ThreadsRepository } from './repositories/threads.repository';

@Injectable()
export class ThreadsService {
  constructor(
    private threadsRepository: ThreadsRepository, 
    private commentsRepository: CommentsRepository,
  ){}
  
}
