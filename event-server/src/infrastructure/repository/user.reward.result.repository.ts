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

  async getById(id: string): Promise<UserRewardResult | null> {
    const result = await this.userRewardResultModel.findById(id);

    return result ? this.toDomain(result) : null;
  }

  async create(userRewardResult: UserRewardResult): Promise<void> {
    try {
      const data = userRewardResult.getInfo();
      await this.userRewardResultModel.create({
        ...data,
        _id: data.id,
        rewardsPartialSnaopshot: data.rewardsPartialSnapshot.map((reward) => ({
          ...reward,
          _id: reward.id,
        })),
        eventPartialSnapshot: {
          ...data.eventPartialSnapshot,
          _id: data.eventPartialSnapshot.id,
        },
      });
    } catch (err: unknown) {
      const mongoDbError = err as { code: number };
      if (mongoDbError?.code === 11000) {
        throw new Error('ALREADY_EXIST');
      }
      throw err;
    }
  }

  async getAllByUserId(userId: string): Promise<UserRewardResult[]> {
    const data = await this.userRewardResultModel
      .find({
        userId,
        deletedAt: null,
      })
      .sort({ createdAt: -1 });
    return data.map((rewardResult) => this.toDomain(rewardResult));
  }

  async getAll(): Promise<UserRewardResult[]> {
    const data = await this.userRewardResultModel
      .find({ deletedAt: null })
      .sort({ createdAt: -1 });
    return data.map((rewardResult) => this.toDomain(rewardResult));
  }

  async update(userResult: UserRewardResult): Promise<void> {
    const { id, ...updateData } = userResult.getInfo();
    await this.userRewardResultModel.updateOne(
      { _id: id },
      { $set: updateData },
    );
  }

  toDomain(userResultSchema: UserRewardResultSchema): UserRewardResult {
    return new UserRewardResult({
      id: userResultSchema._id,
      userId: userResultSchema.userId,
      eventId: userResultSchema.eventId,
      eventPartialInfo: {
        id: userResultSchema.eventPartialSnapshot._id,
        eventName: userResultSchema.eventPartialSnapshot.eventName,
        isActive: userResultSchema.eventPartialSnapshot.isActive,
        eventCondition: userResultSchema.eventPartialSnapshot.eventCondition,
        startDate: userResultSchema.eventPartialSnapshot.startDate,
        endDate: userResultSchema.eventPartialSnapshot.endDate,
      },
      rewardsPartialInfo: userResultSchema.rewardsPartialSnaopshot.map(
        (reward) => ({
          id: reward._id,
          rewardName: reward.rewardName,
          rewardType: reward.rewardType,
          rewardAmount: reward.rewardAmount,
        }),
      ),
      status: userResultSchema.status,
      isConditionCompleted: userResultSchema.isConditionCompleted,
      rewardReceivedAt: userResultSchema.rewardReceivedAt,
    });
  }
}
