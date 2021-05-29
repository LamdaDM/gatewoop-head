import { CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CommentsModule } from './comments/comments.module';
import { CommonProvidersModule } from './common/common.providers.module';
import { caching_Args } from './common/secret-args/arguments.priv';
import { ThreadsModule } from './threads/threads.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ThreadsModule, 
    UsersModule, 
    CommentsModule, 
    CommonProvidersModule,
    AuthModule,
    CacheModule.register(caching_Args)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
