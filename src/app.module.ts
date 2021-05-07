import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommentsModule } from './comments/comments.module';
import { CommonProvidersModule } from './config/common.providers.module';
import { envPaths } from './paths.env.constants';
import { ThreadsModule } from './threads/threads.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ThreadsModule, 
    UsersModule, 
    CommentsModule, 
    CommonProvidersModule, 
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: envPaths,
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
