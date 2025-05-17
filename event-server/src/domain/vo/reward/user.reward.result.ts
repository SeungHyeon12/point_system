import { createUniqueId } from 'src/common/uitls/createUniqueId.function';
import { Event } from '../../event';
import { UserRewardResultStatus } from './user.reward.result.status';
import { EventCondition } from '../condition/event.condition';
import { RewardType } from './reward.type';

export class UserRewardResult {
  id: string;
  userId: string;
  eventId: string;
  eventPartialSnapshot: {
    id: string;
    eventName: string;
    eventCondition: EventCondition;
    isActive: boolean;
    startDate: string;
    endDate: string;
  };
  rewardPartialSnapshot: {
    id: string;
    rewardName: string;
    rewardType: RewardType;
    rewardAmount: number;
  };
  status: UserRewardResultStatus;
  isConditionCompleted: boolean;
  rewardReceivedAt: string | null;

  constructor(args: {
    id: string;
    userId: string;
    eventId: string;
    status: UserRewardResultStatus;
    isConditionCompleted: boolean;
    eventPartialInfo: {
      id: string;
      eventName: string;
      eventCondition: EventCondition;
      isActive: boolean;
      startDate: string;
      endDate: string;
    };
    rewardPartialInfo: {
      id: string;
      rewardName: string;
      rewardType: RewardType;
      rewardAmount: number;
    };
    rewardReceivedAt: string | null;
  }) {
    this.id = args.id;
    this.userId = args.userId;
    this.eventId = args.eventId;
    this.status = args.status;
    this.isConditionCompleted = args.isConditionCompleted;
    this.eventPartialSnapshot = args.eventPartialInfo;
    this.rewardPartialSnapshot = args.rewardPartialInfo;
    this.rewardReceivedAt = args.rewardReceivedAt;
  }

  static rewardSuccessResult(args: { userId: string; event: Event }) {
    return new UserRewardResult({
      id: createUniqueId(),
      userId: args.userId,
      eventId: args.event.getEventInfo().id,
      eventPartialInfo: args.event.getEventInfo(),
      status: UserRewardResultStatus.RECEIVED,
      isConditionCompleted: true,
      rewardPartialInfo: args.event.getEventReward().getRewardInfo(),
      rewardReceivedAt: new Date().toISOString(),
    });
  }

  static registerNeedReviewConditionReward({
    userId,
    event,
  }: {
    userId: string;
    event: Event;
  }) {
    return new UserRewardResult({
      id: createUniqueId(),
      userId,
      eventId: event.getEventInfo().id,
      eventPartialInfo: event.getEventInfo(),
      status: UserRewardResultStatus.REVIEW,
      isConditionCompleted: true,
      rewardPartialInfo: event.getEventReward().getRewardInfo(),
      rewardReceivedAt: null,
    });
  }

  rejectReward() {
    this.status = UserRewardResultStatus.REJECTED;
  }

  approveReward() {
    this.status = UserRewardResultStatus.RECEIVED;
    this.rewardReceivedAt = new Date().toISOString();
  }

  getInfo() {
    return {
      id: this.id,
      userId: this.userId,
      eventId: this.eventPartialSnapshot.id,
      eventPartialSnapshot: {
        ...this.eventPartialSnapshot,
      },
      reward: {
        ...this.rewardPartialSnapshot,
      },
      rewardReceivedAt: this.rewardReceivedAt ?? null,
    };
  }
}
