import { Injectable } from '@nestjs/common';
import { ThreadsRepository } from './repositories/threads.repository';

@Injectable()
export class ThreadsService {
  constructor(
    private threadsRepository: ThreadsRepository, 
  ){}
  
}
