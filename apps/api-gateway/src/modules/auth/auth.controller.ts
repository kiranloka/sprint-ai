import { AuthService } from './auth.service';
import { Controller, Post, Body } from '@nestjs/common';
import type { Register, Login } from '@repo/shared-types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() data: Register) {
    return this.authService.register(data);
  }

  @Post('login')
  login(@Body() data: Login) {
    return this.authService.login(data);
  }
}
