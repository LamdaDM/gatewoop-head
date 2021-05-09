import { Controller } from '@nestjs/common';
import { UsersInternalService } from './services/users.internal.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersInternalService) {}
}
