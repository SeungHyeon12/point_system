import { createUniqueId } from 'src/common/uitls/createUniqueId.function';
import { RewardType } from './reward.type';

export class Reward {
  private readonly id: string;
  private rewardName: string;
  private rewardType: RewardType;
  private rewardAmount: number;

  constructor(args: {
    id: string;
    rewardName: string;
    rewardType: RewardType;
    rewardAmount: number;
  }) {
    this.id = args.id;
    this.rewardName = args.rewardName;
    this.rewardType = args.rewardType;
    this.rewardAmount = args.rewardAmount;
  }

  static createReward(args: {
    rewardName: string;
    rewardType: RewardType;
    rewardAmount: number;
  }) {
    return new Reward({
      id: createUniqueId(),
      rewardName: args.rewardName,
      rewardType: args.rewardType,
      rewardAmount: args.rewardAmount,
    });
  }

  updatereward(args: {
    rewardName: string;
    rewardType: RewardType;
    rewardAmount: number;
  }) {
    this.rewardName = args.rewardName;
    this.rewardType = args.rewardType;
    this.rewardAmount = args.rewardAmount;
  }

  getId() {
    return this.id;
  }

  getRewardInfo() {
    return {
      id: this.id,
      rewardName: this.rewardName,
      rewardType: this.rewardType,
      rewardAmount: this.rewardAmount,
    };
  }
}
