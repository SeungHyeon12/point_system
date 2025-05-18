import { ApiProperty } from '@nestjs/swagger';
import { EventCondition } from 'src/domain/vo/condition/event.condition';
import { GetRewardResponseDtO } from './get.reward.response.dto';
import { RewardType } from 'src/domain/vo/reward/reward.type';

export class GetEventResponseDto {
  @ApiProperty({
    description: '이벤트 ID',
    example: 'event_123abc',
  })
  id: string;

  @ApiProperty({
    description: '이벤트 이름',
    example: '신규 유저 출석 이벤트',
  })
  eventName: string;

  @ApiProperty({
    description: '이벤트 조건 (ENUM)',
    enum: EventCondition,
    example: EventCondition.INVITE_THREE_FRIENDS,
  })
  eventCondition: EventCondition;

  @ApiProperty({
    description: '이벤트 활성화 여부',
    example: true,
  })
  isActive: boolean;

  @ApiProperty({
    description: '이벤트 시작일 (ISO 8601)',
    example: '2025-06-01T00:00:00Z',
  })
  startDate: string;

  @ApiProperty({
    description: '이벤트 종료일 (ISO 8601)',
    example: '2025-06-30T23:59:59Z',
  })
  endDate: string;

  @ApiProperty({
    description: '이벤트 보상 목록',
    type: [GetRewardResponseDtO],
  })
  rewards: GetRewardResponseDtO[];

  constructor(data: {
    rewards: {
      id: string;
      rewardName: string;
      rewardType: RewardType;
      rewardAmount: number;
    }[];
    id: string;
    eventName: string;
    eventCondition: EventCondition;
    isActive: boolean;
    startDate: string;
    endDate: string;
  }) {
    this.id = data.id;
    this.eventName = data.eventName;
    this.eventCondition = data.eventCondition;
    this.isActive = data.isActive;
    this.startDate = data.startDate;
    this.endDate = data.endDate;
    this.rewards = data.rewards.map(
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
