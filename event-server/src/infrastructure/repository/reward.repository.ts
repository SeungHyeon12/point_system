import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RewardDocument, RewardSchema } from './document/reward.document';
import { Reward } from 'src/domain/vo/reward/reward';
import { RewardRepositoryInterface } from 'src/service/interface/reward.repository.interface';

@Injectable()
export class RewardRepository implements RewardRepositoryInterface {
  constructor(
    @InjectModel(RewardDocument.name)
    private readonly rewardModel: Model<RewardSchema>,
  ) {}

  async create(reward: Reward): Promise<void> {
    await this.rewardModel.create({ ...reward.getRewardInfo() });
  }

  async getById(id: string): Promise<Reward | null> {
    const data = await this.rewardModel.findById(id);
    return data ? data.toDomain() : null;
  }

  async getAll(): Promise<Reward[]> {
    const data = await this.rewardModel
      .find({ deletedAt: null })
      .sort({ createdAt: -1 });
    return data.map((reward) => reward.toDomain());
  }

  async getAllByIds(ids: string[]): Promise<Reward[]> {
    const data = await this.rewardModel.find({
      _id: { $in: ids },
      deletedAt: null,
    });
    return data.map((reward) => reward.toDomain());
  }
}
