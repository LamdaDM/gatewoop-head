import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DB_MySQL } from 'src/config/mysql.conn.provider';
import { CommentsRepository } from 'src/comments/repositories/comments.repository';
import { UsersRepository } from './repositories/users.repository';
import { CommonProvidersModule } from 'src/config/providers.module';

@Module({
  controllers: [UsersController],
  imports: [CommonProvidersModule],
  providers: [
    UsersService, 
    UsersRepository,
  ]
})
export class UsersModule {}
