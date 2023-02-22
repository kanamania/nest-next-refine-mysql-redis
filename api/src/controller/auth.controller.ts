import { Controller, Post, Body, NotFoundException } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { Public } from '../utils/ispublic';
import { TResponse } from '../types/TResponse';

@Controller()
export class AuthController {
  private response: TResponse = new TResponse();
  constructor(private authService: AuthService) {}
  @Public()
  @Post('auth/login')
  async login(@Body() req: { username?: any; email?: any; password: any }) {
    return this.authService
      .validateUser(req.email ?? req.username, req.password)
      .then((user) => {
        console.log({ login: user });
        if (user != null) {
          this.authService.login(user).then((token) => {
            this.response.code = 201;
            this.response.status = 'success';
            this.response.access_token = token;
            this.response.data = user;
            console.log({ login_response: this.response });
            return this.response;
          });
        }
      });
  }
}
