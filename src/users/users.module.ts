import { Module } from '@nestjs/common';
import { UsersInternalService } from './services/users.internal.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './repositories/users.repository';
import { CommonProvidersModule } from 'src/common/common.providers.module';

@Module({
  controllers: [UsersController],
  imports: [CommonProvidersModule],
  providers: [
    UsersInternalService, 
    UsersRepository,
  ],
  exports: [UsersInternalService]
})
export class UsersModule {}
