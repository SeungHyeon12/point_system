import { EventCondition } from 'src/domain/vo/condition/event.condition';
import { RewardType } from 'src/domain/vo/reward/reward.type';

class EventPartialSnapshotDto {
  id: string;
  eventName: string;
  eventCondition: EventCondition;
  isActive: boolean;
  startDate: string;
  endDate: string;
}

class RewardPartialSnapshotDto {
  id: string;
  rewardName: string;
  rewardType: RewardType;
  rewardAmount: number;
}

export class GetRewardRequestResponseDTO {
  id: string;
  userId: string;
  eventId: string;
  eventPartialSnapshot: EventPartialSnapshotDto;
  rewardsPartialSnapshot: RewardPartialSnapshotDto[];
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
