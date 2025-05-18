import { IsEnum, IsNumber, IsString } from 'class-validator';
import { RewardType } from 'src/domain/vo/reward/reward.type';

export class GetRewardResponseDtO {
  @IsString()
  id: string;

  @IsString()
  rewardName: string;

  @IsString()
  @IsEnum(RewardType)
  rewardType: RewardType;

  @IsNumber()
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
