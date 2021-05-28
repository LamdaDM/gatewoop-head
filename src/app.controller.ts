import { Controller, Param, Post, Request, UseGuards } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
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

  @UseGuards(LocalAuthGuard)
  @Post('/authenticate/:userid')
  async authenticate(
    @Request() request: FastifyRequest,
    @Param() userID: number,
  ) { request.session.set('user_id', userID) }
}
