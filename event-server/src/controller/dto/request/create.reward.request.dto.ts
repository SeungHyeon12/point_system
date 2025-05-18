import { IsEnum, IsNumber, IsString } from 'class-validator';
import { RewardType } from 'src/domain/vo/reward/reward.type';

export class CreateRewardRequestDTO {
  @IsString()
  rewardName: string;

  @IsString()
  @IsEnum(RewardType)
  rewardType: RewardType;

  @IsNumber()
  rewardAmount: number;
}
