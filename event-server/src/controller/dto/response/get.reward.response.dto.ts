import { ApiProperty } from '@nestjs/swagger';
import { RewardType } from 'src/domain/vo/reward/reward.type';

export class GetRewardResponseDtO {
  @ApiProperty({
    description: '보상 ID',
    example: 'reward_abc123',
  })
  id: string;

  @ApiProperty({
    description: '보상 이름',
    example: '출석 보상 포인트',
  })
  rewardName: string;

  @ApiProperty({
    description: '보상 타입',
    enum: RewardType,
    example: RewardType.POINT,
  })
  rewardType: RewardType;

  @ApiProperty({
    description: '보상 수치 (포인트, 아이템 수 등)',
    example: 1000,
  })
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
