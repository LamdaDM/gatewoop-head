import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './repositories/users.repository';
import { CommonProvidersModule } from 'src/config/providers.module';

@Module({
  controllers: [UsersController],
  imports: [CommonProvidersModule],
  providers: [
    UsersService, 
    UsersRepository,
  ],
  exports: [UsersService]
})
export class UsersModule {}
