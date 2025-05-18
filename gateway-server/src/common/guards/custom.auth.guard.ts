import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import { Request } from 'express';
import { UserRole } from '../roles/roles';
import { GatewayService } from 'src/service/gateway.proxy.service';
import serverConfig from '../config/server.config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class CustomAuthGuard implements CanActivate {
  constructor(
    private readonly gatewayService: GatewayService,
    @Inject(serverConfig.KEY)
    private readonly config: ConfigType<typeof serverConfig>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context
      .switchToHttp()
      .getRequest<Request & { user: { sub: string; role: UserRole } }>();
    const authHeader = request.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('unauthorized');
    }

    const token = authHeader.split(' ')[1];

    try {
      // 200 요청을 받은경우는 정상적인 경우로 처리한다.
      const data: { data: { sub: string; role: UserRole } } =
        await this.gatewayService.proxy({
          method: 'POST',
          url: `${this.config.AUTH_SERVER_URI}/auth/token/introspect`,
          options: {
            body: { token },
          },
        });
      // 요청 객체에 user 정보 추가 (req.user)
      request.user = {
        sub: data.data.sub,
        role: data.data.role,
      };

      return true;
    } catch (err) {
      console.log(err);
      throw new UnauthorizedException('Token introspection failed');
    }
  }
}
