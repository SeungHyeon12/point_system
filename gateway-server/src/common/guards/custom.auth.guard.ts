import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Request } from 'express';
import { UserRole } from '../roles/roles';

@Injectable()
export class CustomAuthGuard implements CanActivate {
  constructor(private readonly httpService: HttpService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException(
        'Missing or invalid Authorization header',
      );
    }

    const token = authHeader.split(' ')[1];

    try {
      // 200 요청을 받은경우는 정상적인 경우로 처리한다.
      const { data } = await firstValueFrom(
        this.httpService.post<{
          data: {
            sub: string;
            active: boolean;
            role?: string;
          };
        }>('http://auth-server:3000/token/introspect', { token }),
      );
      // 요청 객체에 user 정보 추가 (req.user)
      (request as Request & { user: { sub: string; role: UserRole } }).user = {
        sub: data.data.sub as string,
        role: data.data.role as UserRole,
      };

      return true;
    } catch (err) {
      throw new UnauthorizedException(err, 'Token introspection failed');
    }
  }
}
