import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CommentsModule } from './comments/comments.module';
import { CommonProvidersModule } from './common/common.providers.module';
import { ThreadsModule } from './threads/threads.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ThreadsModule, 
    UsersModule, 
    CommentsModule, 
    CommonProvidersModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
