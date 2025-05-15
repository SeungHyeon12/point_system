import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/domain/user';
import {
  UserDocument,
  UserSchema,
} from 'src/infrastructure/repository/document/user.document';
import { UserRepositoryInterface } from 'src/service/interface/user.repository.interface';

@Injectable()
export class UserRepostiory implements UserRepositoryInterface {
  constructor(
    @InjectModel(UserDocument.name)
    private readonly userDocument: Model<UserSchema>,
  ) {}

  async createUser(user: User): Promise<void> {
    await this.userDocument.create({ ...user.getCreateUserInfo() });
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const data = await this.userDocument.findOne({
      email,
    });
    return data ? data.toDomain() : null;
  }

  async getUserById(id: string): Promise<User | null> {
    const data = await this.userDocument.findById(id);
    return data ? data.toDomain() : null;
  }
}
