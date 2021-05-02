import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommentsModule } from './comments/comments.module';
import { CommonProvidersModule } from './config/providers.module';
import { ThreadsModule } from './threads/threads.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [ThreadsModule, UsersModule, CommentsModule, CommonProvidersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
