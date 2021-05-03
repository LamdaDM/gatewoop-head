import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommentsModule } from './comments/comments.module';
import { CommonProvidersModule } from './config/providers.module';
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
      envFilePath: ['.env', '.env.gla2h.params'],
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
