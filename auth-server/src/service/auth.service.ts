import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/domain/user';
import { UserRole } from 'src/domain/vo/user.role';
import { ScopeValues } from 'src/domain/vo/user.role.scope.helper';
import { UserRepositoryInterface } from 'src/service/interface/user.repository.interface';

export type AuthTokenType =
  | {
      sub: string;
      role: UserRole;
      scope: string[];
      type: 'access';
      exp: number;
    }
  | {
      sub: string;
      type: 'refresh';
      exp: number;
    };

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: UserRepositoryInterface,
    private readonly jwtService: JwtService,
  ) {}

  async normalUserSignUp(args: { email: string; rawPassword: string }) {
    // 비밀번호의 유효성 로직은 우선순위가 아님으로 배재
    const newUser = await User.createUser({
      email: args.email,
      rawPassword: args.rawPassword,
      userRole: UserRole.USER,
    });

    await this.userRepository.createUser(newUser);
  }

  async adminUserSignUp(args: {
    email: string;
    rawPassword: string;
    role: Exclude<UserRole, 'USER'>;
  }) {
    const newUser = await User.createUser({
      email: args.email,
      rawPassword: args.rawPassword,
      userRole: args.role,
    });

    await this.userRepository.createUser(newUser);
  }

  async signIn(args: { email: string; rawPassword: string }) {
    const user = await this.userRepository.getUserByEmail(args.email);

    if (!user) {
      throw new NotFoundException('user not found');
    }

    if (!(await user.isVerifiedPassword(args.rawPassword))) {
      throw new UnauthorizedException('invalid password or id');
    }

    const accessToken = this.jwtService.sign(
      {
        sub: user.getId(),
        role: user.getRole(),
        scope: [...user.getAvailableScopes()],
        type: 'access',
      },
      {
        expiresIn: '15m',
      },
    );

    const refreshToken = this.jwtService.sign(
      {
        sub: user.getId(),
        type: 'refresh',
      },
      {
        expiresIn: '10h',
      },
    );

    return {
      refreshToken,
      accessToken,
    };
  }

  async tokenIntrospect(args: { token: string }) {
    const payload = this.jwtService.verify<AuthTokenType>(args.token);

    if (!payload) {
      throw new UnauthorizedException('invalid token');
    }

    const user = await this.userRepository.getUserById(payload.sub);

    if (!user) {
      throw new NotFoundException('user not found');
    }

    if (payload.type == 'access') {
      if (user.getId() !== payload.sub) {
        throw new UnauthorizedException('invalid token');
      }

      if (!user.isScopesCorrect(payload.scope)) {
        throw new UnauthorizedException('invalid token');
      }

      return {
        sub: payload.sub,
        active: true,
        scope: payload.scope as ScopeValues[],
        exp: payload?.exp,
      };
    } else if (payload.type == 'refresh') {
      if (user.getId() !== payload.sub) {
        throw new UnauthorizedException('invalid token');
      }

      return {
        sub: payload.sub,
        active: true,
        exp: payload?.exp,
      };
    } else {
      throw new UnauthorizedException('invalid token type');
    }
  }
}
