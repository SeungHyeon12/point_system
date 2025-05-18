import {
  Body,
  Controller,
  Get,
  Headers,
  Inject,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import serverConfig from 'src/common/config/server.config';
import { CustomAuthGuard } from 'src/common/guards/custom.auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/roles/role.decorator';
import { UserRole } from 'src/common/roles/roles';
import { GatewayService } from 'src/service/gateway.proxy.service';

@Controller('gw/auth')
export class AuthController {
  constructor(
    @Inject(serverConfig.KEY)
    private readonly config: ConfigType<typeof serverConfig>,
    private readonly gatewayService: GatewayService,
  ) {}

  @UseGuards(CustomAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.USER, UserRole.AUDITOR, UserRole.OPERATOR)
  @Get('user/:userId')
  async getUserInfo(@Param('userId') userId: string) {
    const data: Record<string, any> = await this.gatewayService.proxy({
      method: 'GET',
      url: `${this.config.AUTH_SERVER_URI}/auth/user/${userId}`,
      options: {},
    });

    return data;
  }

  @Post('sign-up')
  async signUp(@Body() signUpRequest: Record<string, any>) {
    const data: Record<string, any> = await this.gatewayService.proxy({
      method: 'POST',
      url: `${this.config.AUTH_SERVER_URI}/auth/sign-up`,
      options: {
        body: signUpRequest,
      },
    });

    return data;
  }

  @Post('admin/sign-up')
  async adminSignUp(@Body() adminSginUpRequest: Record<string, any>) {
    const data: Record<string, any> = await this.gatewayService.proxy({
      method: 'POST',
      url: `${this.config.AUTH_SERVER_URI}/auth/admin/sign-up`,
      options: {
        body: adminSginUpRequest,
      },
    });

    return data;
  }

  @Post('sign-in')
  async signIn(@Body() signInRequest: Record<string, any>) {
    const data: Record<string, any> = await this.gatewayService.proxy({
      method: 'POST',
      url: `${this.config.AUTH_SERVER_URI}/auth/sign-in`,
      options: {
        body: signInRequest,
      },
    });

    return data;
  }

  @Post('access-token/refresh')
  async refreshAccessToken(@Headers('authorization') token: string) {
    const data: Record<string, any> = await this.gatewayService.proxy({
      method: 'POST',
      url: `${this.config.AUTH_SERVER_URI}/access-token/refresh`,
      options: {
        headers: {
          authorization: token,
        },
      },
    });

    return data;
  }
}
