import { Module } from '@nestjs/common';
import { ThreadsService } from './threads.service';
import { ThreadsController } from './threads.controller';
import { CommonProvidersModule } from 'src/config/providers.module';
import { ThreadsRepository } from './repositories/threads.repository';

@Module({
  controllers: [ThreadsController],
  providers: [ThreadsService, ThreadsRepository],
  imports: [CommonProvidersModule]
})
export class ThreadsModule {}
