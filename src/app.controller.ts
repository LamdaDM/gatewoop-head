import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local/local.auth-guard';

@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req: any) {
    return await this.authService.login(req.user);
  }
}
