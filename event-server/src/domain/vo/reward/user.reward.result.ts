import { createUniqueId } from 'src/common/uitls/createUniqueId.function';
import { Reward } from './reward';
import { Event } from '../../event';
import { UserRewardResultStatus } from './user.reward.result.status';
import { EventCondition } from '../condition/event.condition';
import { RewardType } from './reward.type';

export class UserRewardResult {
  id: string;
  userId: string;
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
    this.status = args.status;
    this.isConditionCompleted = args.isConditionCompleted;
    this.eventPartialSnapshot = args.eventPartialInfo;
    this.rewardPartialSnapshot = args.rewardPartialInfo;
    this.rewardReceivedAt = args.rewardReceivedAt;
  }

  static rewardSuccessResult(args: {
    userId: string;
    event: Event;
    reward: Reward;
  }) {
    return new UserRewardResult({
      id: createUniqueId(),
      userId: args.userId,
      eventPartialInfo: args.event.getEventInfo(),
      status: UserRewardResultStatus.RECEIVED,
      isConditionCompleted: true,
      rewardPartialInfo: args.reward.getRewardInfo(),
      rewardReceivedAt: new Date().toISOString(),
    });
  }

  static registerNeedReviewConditionReward({
    userId,
    event,
    reward,
  }: {
    userId: string;
    event: Event;
    reward: Reward;
  }) {
    return new UserRewardResult({
      id: createUniqueId(),
      userId,
      eventPartialInfo: event.getEventInfo(),
      status: UserRewardResultStatus.REVIEW,
      isConditionCompleted: true,
      rewardPartialInfo: reward.getRewardInfo(),
      rewardReceivedAt: null,
    });
  }

  static fialedResult(args: { userId: string; event: Event; reward: Reward }) {
    return new UserRewardResult({
      id: createUniqueId(),
      userId: args.userId,
      eventPartialInfo: args.event.getEventInfo(),
      status: UserRewardResultStatus.REJECTED,
      isConditionCompleted: false,
      rewardPartialInfo: args.reward.getRewardInfo(),
      rewardReceivedAt: null,
    });
  }

  saveUserRewardResult() {
    return {
      id: this.id,
      userId: this.userId,
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
