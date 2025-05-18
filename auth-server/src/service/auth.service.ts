import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  JsonWebTokenError,
  JwtService,
  NotBeforeError,
  TokenExpiredError,
} from '@nestjs/jwt';
import { User } from 'src/domain/user';
import { UserRole } from 'src/domain/vo/user.role';
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

  async normalUserSignUp(args: {
    email: string;
    rawPassword: string;
    recommenderEmail?: string;
  }) {
    // 비밀번호의 유효성 로직은 우선순위가 아님으로 배재
    let recommender: User | null = null;
    if (args.recommenderEmail) {
      recommender = await this.userRepository.getUserByEmail(
        args.recommenderEmail,
      );
      if (!recommender) {
        throw new NotFoundException('recommender not found');
      }
    }

    const newUser = await User.createUser({
      email: args.email,
      rawPassword: args.rawPassword,
      userRole: UserRole.USER,
      recommenderId: recommender?.getId(),
    });

    await this.userRepository.create(newUser);
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

    await this.userRepository.create(newUser);
  }

  async signIn(args: { email: string; rawPassword: string }) {
    const user = await this.userRepository.getUserByEmail(args.email);

    if (!user) {
      throw new NotFoundException('user not found');
    }

    if (!(await user.isVerifiedPassword(args.rawPassword))) {
      throw new UnauthorizedException('invalid password or id');
    }

    user.signIn();
    await this.userRepository.update(user);

    const accessToken = this.jwtService.sign(
      {
        sub: user.getId(),
        role: user.getRole(),
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
    let payload: AuthTokenType;
    try {
      payload = this.jwtService.verify<AuthTokenType>(args.token);
    } catch (err) {
      if (
        err instanceof TokenExpiredError ||
        err instanceof JsonWebTokenError ||
        err instanceof NotBeforeError
      ) {
        throw new BadRequestException('Malformed or expired JWT token');
      }
      throw err;
    }

    if (!payload) {
      throw new UnauthorizedException('invalid token');
    }

    const user = await this.userRepository.getUserById(payload.sub);

    if (!user) {
      throw new UnauthorizedException('user not found');
    }

    if (payload.type == 'access') {
      if (user.getId() !== payload.sub) {
        throw new UnauthorizedException('invalid token');
      }
      return {
        sub: payload.sub,
        role: payload.role,
        active: true,
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

  async refreshAccessToken(args: {
    bearerToken: string;
  }): Promise<{ accessToken: string }> {
    if (!args.bearerToken || !args.bearerToken?.startsWith('Bearer ')) {
      throw new UnauthorizedException('Refresh token is missing or invalid');
    }

    const refreshToken = args.bearerToken.replace('Bearer ', '').trim();

    const payload = this.jwtService.verify<AuthTokenType>(refreshToken);
    if (payload.type !== 'refresh') {
      throw new UnauthorizedException('invalid token type');
    }

    const user = await this.userRepository.getUserById(payload.sub);

    if (!user) {
      throw new UnauthorizedException('user not found');
    }

    const accessToken = this.jwtService.sign(
      {
        sub: user.getId(),
        role: user.getRole(),
        type: 'access',
      },
      {
        expiresIn: '15m',
      },
    );

    return { accessToken };
  }

  async getUserInfo(args: { userId: string }) {
    console.log('getUserInfo', args.userId);
    const user = await this.userRepository.getUserById(args.userId);

    if (!user) {
      throw new NotFoundException('user not found');
    }

    const recommenderCount = await this.userRepository.getRecommenderCount(
      args.userId,
    );

    return { ...user.getUserInfo(), recommenderCount };
  }
}
