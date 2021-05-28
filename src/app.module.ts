import { CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CommentsModule } from './comments/comments.module';
import { CommonProvidersModule } from './common/common.providers.module';
import { cache_Args } from './common/lib/cache/cache.arguments';
import { ThreadsModule } from './threads/threads.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ThreadsModule, 
    UsersModule, 
    CommentsModule, 
    CommonProvidersModule,
    AuthModule,
    CacheModule.register(cache_Args)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
