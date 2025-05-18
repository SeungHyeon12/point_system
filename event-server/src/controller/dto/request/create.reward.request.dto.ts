import { IsEnum, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RewardType } from 'src/domain/vo/reward/reward.type';

export class CreateRewardRequestDTO {
  @ApiProperty({
    description: '보상 이름',
    example: '1000 포인트',
  })
  @IsString()
  rewardName: string;

  @ApiProperty({
    description: '보상 타입 (ENUM)',
    enum: RewardType,
    example: RewardType.POINT, // 실제 enum 값 중 하나
  })
  @IsString()
  @IsEnum(RewardType)
  rewardType: RewardType;

  @ApiProperty({
    description: '보상 수치 (예: 포인트 개수, 아이템 수량 등)',
    example: 1000,
  })
  @IsNumber()
  rewardAmount: number;
}
