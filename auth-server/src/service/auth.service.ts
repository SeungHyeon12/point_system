import { Inject, Injectable } from '@nestjs/common';
import { UserRepositoryInterface } from 'src/service/interface/user.repository.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: UserRepositoryInterface,
  ) {}
}
