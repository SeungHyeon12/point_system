import { Controller, Post } from '@nestjs/common';
import { SignInRequestDTO } from 'src/controller/dto/request/sign.in.request.dto';
import { SignUpRequestDTO } from 'src/controller/dto/request/sign.up.request.dto';
import { SignInResponseDto } from 'src/controller/dto/response/sign.in.response.dto';
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

  @Post('sign-in')
  async signIn(signInRequest: SignInRequestDTO) {
    const data = await this.authService.signIn({
      ...signInRequest,
      rawPassword: signInRequest.password,
    });

    return new SignInResponseDto(data);
  }
}
