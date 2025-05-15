import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/domain/user';
import { UserRole } from 'src/domain/vo/user.role';
import { UserRepositoryInterface } from 'src/service/interface/user.repository.interface';

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
        scopes: [...user.getAvailableScopes()],
      },
      {
        expiresIn: '15m',
      },
    );

    const refreshToken = this.jwtService.sign(
      {
        sub: user.getId(),
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
}
