import { Body, Controller, Headers, Post } from '@nestjs/common';
import { SignInRequestDTO } from 'src/controller/dto/request/sign.in.request.dto';
import { SignUpRequestDTO } from 'src/controller/dto/request/sign.up.request.dto';
import { SignInResponseDto } from 'src/controller/dto/response/sign.in.response.dto';
import { AuthService } from 'src/service/auth.service';
import { TokenIntrospectRequestDTO } from './dto/request/token.introspect.request.dto';
import { TokenIntrospectResponseDTO } from './dto/response/token.introspect.response.dto';
import { RefreshAccessTokenResponseDTO } from './dto/response/refresh.access.token.response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  async signUp(@Body() signUpRequest: SignUpRequestDTO) {
    await this.authService.normalUserSignUp({
      ...signUpRequest,
      rawPassword: signUpRequest.password,
    });
  }

  @Post('sign-in')
  async signIn(@Body() signInRequest: SignInRequestDTO) {
    const data = await this.authService.signIn({
      ...signInRequest,
      rawPassword: signInRequest.password,
    });

    return new SignInResponseDto(data);
  }

  @Post('token/introspect')
  async tokenIntrospect(
    @Body() tokenIntropsectRequestDto: TokenIntrospectRequestDTO,
  ) {
    const data = await this.authService.tokenIntrospect({
      token: tokenIntropsectRequestDto.token,
    });

    return new TokenIntrospectResponseDTO(data);
  }

  @Post('access-token/refresh')
  async refreshAccessToken(@Headers('authorization') bearerToken: string) {
    const data = await this.authService.refreshAccessToken({ bearerToken });
    return new RefreshAccessTokenResponseDTO({ ...data });
  }
}
