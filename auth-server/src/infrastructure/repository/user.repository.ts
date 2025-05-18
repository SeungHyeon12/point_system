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

  async create(user: User): Promise<void> {
    const info = user.getCreateUserInfo();
    await this.userDocument.create({ ...info, _id: info.id });
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const data = await this.userDocument.findOne({
      email,
    });
    return data ? this.toDomain(data) : null;
  }

  async getUserById(id: string): Promise<User | null> {
    const data = await this.userDocument.findById(id);
    return data ? this.toDomain(data) : null;
  }

  async update(user: User): Promise<void> {
    const { id, ...updateData } = user.getUserInfo();
    await this.userDocument.updateOne({ _id: id }, updateData);
  }

  async getRecommenderCount(id: string): Promise<number> {
    return this.userDocument.countDocuments({ recommenderId: id });
  }

  toDomain(user: UserDocument): User {
    return new User({
      id: user._id,
      email: user.email,
      password: user.password,
      userRole: user.userRole,
      recommenderId: user.recommenderId,
      lastLoginDate: user.lastLoginDate,
      loginDays: user.loginDays,
    });
  }
}
