import { Controller, Post, UseGuards } from '@nestjs/common';
import { LocalGuard } from './auth/guards/local.guard';
import { AuthService } from './auth/services/auth.service';

@Controller()
export class AppController {
  constructor(private authService: AuthService){}
  
  @UseGuards(LocalGuard)
  @Post('/login')
  async login(){}
}
