import { Controller, Post } from '@nestjs/common';
import { SignUpRequestDTO } from 'src/controller/dto/request/sign.up.request.dto';
import { AuthService } from 'src/service/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  async signUp(signUpRequest: SignUpRequestDTO) {
    await this.authService.normalUserSignUp({
      ...signUpRequest,
      rawPassword: signUpRequest.password,
    });
  }
}
