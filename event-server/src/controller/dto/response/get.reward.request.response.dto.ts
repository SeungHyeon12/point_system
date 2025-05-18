import { ApiProperty } from '@nestjs/swagger';
import { EventCondition } from 'src/domain/vo/condition/event.condition';
import { RewardType } from 'src/domain/vo/reward/reward.type';

class EventPartialSnapshotDto {
  @ApiProperty({ description: '이벤트 ID', example: 'event_123abc' })
  id: string;

  @ApiProperty({ description: '이벤트 이름', example: '신규 유저 출석 이벤트' })
  eventName: string;

  @ApiProperty({
    description: '이벤트 조건',
    enum: EventCondition,
    example: EventCondition.INVITE_THREE_FRIENDS,
  })
  eventCondition: EventCondition;

  @ApiProperty({ description: '이벤트 활성화 여부', example: true })
  isActive: boolean;

  @ApiProperty({
    description: '이벤트 시작일',
    example: '2025-06-01T00:00:00Z',
  })
  startDate: string;

  @ApiProperty({
    description: '이벤트 종료일',
    example: '2025-06-30T23:59:59Z',
  })
  endDate: string;
}

class RewardPartialSnapshotDto {
  @ApiProperty({ description: '보상 ID', example: 'reward_abc123' })
  id: string;

  @ApiProperty({ description: '보상 이름', example: '1000 포인트' })
  rewardName: string;

  @ApiProperty({
    description: '보상 타입',
    enum: RewardType,
    example: RewardType.POINT,
  })
  rewardType: RewardType;

  @ApiProperty({ description: '보상 수치', example: 1000 })
  rewardAmount: number;
}

export class GetRewardRequestResponseDTO {
  @ApiProperty({ description: '보상 요청 ID', example: 'reward_request_001' })
  id: string;

  @ApiProperty({ description: '유저 ID', example: 'user_123' })
  userId: string;

  @ApiProperty({ description: '이벤트 ID', example: 'event_123abc' })
  eventId: string;

  @ApiProperty({
    description: '스냅샷된 이벤트 정보',
    type: EventPartialSnapshotDto,
  })
  eventPartialSnapshot: EventPartialSnapshotDto;

  @ApiProperty({
    description: '스냅샷된 보상 목록',
    type: [RewardPartialSnapshotDto],
  })
  rewardsPartialSnapshot: RewardPartialSnapshotDto[];

  @ApiProperty({
    description: '보상 수령 시간 (없으면 null)',
    example: '2025-06-02T15:30:00Z',
    nullable: true,
  })
  rewardReceivedAt: string | null;

  constructor(data: {
    id: string;
    userId: string;
    eventId: string;
    eventPartialSnapshot: EventPartialSnapshotDto;
    rewardsPartialSnapshot: RewardPartialSnapshotDto[];
    rewardReceivedAt: string | null;
  }) {
    this.id = data.id;
    this.userId = data.userId;
    this.eventId = data.eventId;
    this.eventPartialSnapshot = data.eventPartialSnapshot;
    this.rewardsPartialSnapshot = data.rewardsPartialSnapshot;
    this.rewardReceivedAt = data.rewardReceivedAt;
  }
}
