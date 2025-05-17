import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  UserRewardResultDocument,
  UserRewardResultSchema,
} from './document/user.reward.result.document';
import { UserRewardResult } from 'src/domain/vo/reward/user.reward.result';
import { UserRewardResultRepositoryInterface } from 'src/service/interface/user.reward.result.repository.interface';

@Injectable()
export class UserRewardResultRepository
  implements UserRewardResultRepositoryInterface
{
  constructor(
    @InjectModel(UserRewardResultDocument.name)
    private readonly userRewardResultModel: Model<UserRewardResultSchema>,
  ) {}

  async create(userRewardResult: UserRewardResult): Promise<void> {
    await this.userRewardResultModel.create({ ...userRewardResult.save() });
  }

  async getAllByUserId(userId: string): Promise<UserRewardResult[]> {
    const data = await this.userRewardResultModel
      .find({
        userId,
        deletedAt: null,
      })
      .sort({ createdAt: -1 });
    return data.map((rewardResult) => rewardResult.toDomain());
  }

  async getAll(): Promise<UserRewardResult[]> {
    const data = await this.userRewardResultModel
      .find({ deletedAt: null })
      .sort({ createdAt: -1 });
    return data.map((rewardResult) => rewardResult.toDomain());
  }
}
