import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DB_MySQL } from 'src/config/mysql.conn';
import { CommentsRepository } from 'src/comments/repositories/comments.repository';
import { UsersRepository } from './users.repository';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService, 
    DB_MySQL, 
    UsersRepository, 
    CommentsRepository,
  ]
})
export class UsersModule {}
