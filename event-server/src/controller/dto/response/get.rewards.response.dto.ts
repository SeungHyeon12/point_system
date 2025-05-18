import { ApiProperty } from '@nestjs/swagger';
import { GetRewardResponseDtO } from './get.reward.response.dto';
import { RewardType } from 'src/domain/vo/reward/reward.type';

export class GetRewardsResponseDTO {
  @ApiProperty({
    description: '보상 목록',
    type: [GetRewardResponseDtO],
  })
  rewards: GetRewardResponseDtO[];

  constructor(
    data: {
      id: string;
      rewardName: string;
      rewardType: RewardType;
      rewardAmount: number;
    }[],
  ) {
    this.rewards = data.map(
      (reward) =>
        new GetRewardResponseDtO({
          id: reward.id,
          rewardName: reward.rewardName,
          rewardType: reward.rewardType,
          rewardAmount: reward.rewardAmount,
        }),
    );
  }
}
