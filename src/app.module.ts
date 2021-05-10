import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommentsModule } from './comments/comments.module';
import { CommonProvidersModule } from './common/common.providers.module';
import { ENV_PATHS } from './paths.env.constants';
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
      envFilePath: ENV_PATHS,
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
