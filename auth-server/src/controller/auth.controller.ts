import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { SignInRequestDTO } from 'src/controller/dto/request/sign.in.request.dto';
import { SignUpRequestDTO } from 'src/controller/dto/request/sign.up.request.dto';
import { SignInResponseDto } from 'src/controller/dto/response/sign.in.response.dto';
import { AuthService } from 'src/service/auth.service';
import { TokenIntrospectRequestDTO } from './dto/request/token.introspect.request.dto';
import { TokenIntrospectResponseDTO } from './dto/response/token.introspect.response.dto';
import { RefreshAccessTokenResponseDTO } from './dto/response/refresh.access.token.response.dto';
import { GetUserInfoResponseDTO } from './dto/response/get.user.info.response.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiCommonOkResponse } from 'src/common/response/common.response.decorator';
import { CommonResponseDto } from 'src/common/response/common.response.dto';
import { AdminSignUpRequestDTO } from './dto/request/admin.sign.up.request.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'internal 요청으로 들어온 유저 정보 조회',
  })
  @ApiCommonOkResponse(GetUserInfoResponseDTO)
  @Get('user/:userId')
  async getUserInfo(@Headers('userId') userId: string) {
    const data = await this.authService.getUserInfo({ userId });
    const response = new GetUserInfoResponseDTO(data);
    return new CommonResponseDto<GetUserInfoResponseDTO>({
      data: response,
    });
  }

  @ApiOperation({
    summary: '회원 가입',
  })
  @Post('sign-up')
  async signUp(@Body() signUpRequest: SignUpRequestDTO) {
    await this.authService.normalUserSignUp({
      ...signUpRequest,
      rawPassword: signUpRequest.password,
    });
    return new CommonResponseDto<null>({
      data: null,
    });
  }

  @ApiOperation({
    summary: '<어드민 관련> 회원 가입',
  })
  @Post('admin/sign-up')
  async adminSignUp(@Body() adminSginUpRequest: AdminSignUpRequestDTO) {
    await this.authService.adminUserSignUp({
      ...adminSginUpRequest,
      rawPassword: adminSginUpRequest.password,
    });
    return new CommonResponseDto<null>({
      data: null,
    });
  }

  @ApiOperation({
    summary: '로그인',
  })
  @ApiCommonOkResponse(SignInResponseDto)
  @Post('sign-in')
  async signIn(@Body() signInRequest: SignInRequestDTO) {
    const data = await this.authService.signIn({
      ...signInRequest,
      rawPassword: signInRequest.password,
    });

    const response = new SignInResponseDto(data);
    return new CommonResponseDto<SignInResponseDto>({
      data: response,
    });
  }

  @ApiOperation({
    summary: 'gateway 에서 토큰에 대한 유효성검사를 위한 API',
  })
  @ApiCommonOkResponse(TokenIntrospectResponseDTO)
  @Post('token/introspect')
  async tokenIntrospect(
    @Body() tokenIntropsectRequestDto: TokenIntrospectRequestDTO,
  ) {
    const data = await this.authService.tokenIntrospect({
      token: tokenIntropsectRequestDto.token,
    });

    const response = new TokenIntrospectResponseDTO(data);
    return new CommonResponseDto<TokenIntrospectResponseDTO>({
      data: response,
    });
  }

  @ApiOperation({
    summary: 'access token refresh를 위한 API',
  })
  @ApiCommonOkResponse(TokenIntrospectResponseDTO)
  @Post('access-token/refresh')
  async refreshAccessToken(@Headers('authorization') bearerToken: string) {
    const data = await this.authService.refreshAccessToken({ bearerToken });
    const respones = new RefreshAccessTokenResponseDTO({ ...data });
    return new CommonResponseDto<RefreshAccessTokenResponseDTO>({
      data: respones,
    });
  }
}
