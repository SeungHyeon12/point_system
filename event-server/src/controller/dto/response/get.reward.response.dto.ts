import { RewardType } from 'src/domain/vo/reward/reward.type';

export class GetRewardResponseDtO {
  id: string;
  rewardName: string;
  rewardType: RewardType;
  rewardAmount: number;

  constructor(data: {
    id: string;
    rewardName: string;
    rewardType: RewardType;
    rewardAmount: number;
  }) {
    this.id = data.id;
    this.rewardName = data.rewardName;
    this.rewardType = data.rewardType;
    this.rewardAmount = data.rewardAmount;
  }
}
