import { IsEnum, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum RewardReviewStatus {
  APPROVE = 'APPROVE',
  REJECT = 'REJECT',
}

export class ReviewRewardRequestDTO {
  @ApiProperty({
    description: '보상 결과 ID',
    example: 'reward_result_123',
  })
  @IsString()
  rewardResultId: string;

  @ApiProperty({
    description: '검토 결과 (승인 또는 거절)',
    enum: RewardReviewStatus,
    example: RewardReviewStatus.APPROVE,
  })
  @IsString()
  @IsEnum(RewardReviewStatus)
  status: RewardReviewStatus;
}
