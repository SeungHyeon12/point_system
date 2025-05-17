import { createUniqueId } from 'src/common/uitls/createUniqueId.function';
import { Reward } from './reward';
import { Event } from '../../event';
import { UserRewardResultStatus } from './user.reward.result.status';

export class UserRewardResult {
  id: string;
  userId: string;
  event: Event;
  reward: Reward;
  status: UserRewardResultStatus;
  receiveAt: string | null;

  constructor(args: {
    id: string;
    userId: string;
    status: UserRewardResultStatus;
    isConditionCompleted: boolean;
    event: Event;
    reward: Reward;
    receiveAt: string | null;
  }) {
    this.id = args.id;
    this.userId = args.userId;
    this.status = args.status;
    this.event = args.event;
    this.reward = args.reward;
    this.receiveAt = args.receiveAt;
  }

  static rewardSuccessResult(args: {
    userId: string;
    event: Event;
    reward: Reward;
  }) {
    return new UserRewardResult({
      id: createUniqueId(),
      userId: args.userId,
      event: args.event,
      status: UserRewardResultStatus.RECEIVED,
      isConditionCompleted: true,
      reward: args.reward,
      receiveAt: new Date().toISOString(),
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
      event,
      status: UserRewardResultStatus.REVIEW,
      isConditionCompleted: true,
      reward,
      receiveAt: null,
    });
  }

  static fialedResult(args: { userId: string; event: Event; reward: Reward }) {
    return new UserRewardResult({
      id: createUniqueId(),
      userId: args.userId,
      event: args.event,
      status: UserRewardResultStatus.REJECTED,
      isConditionCompleted: false,
      reward: args.reward,
      receiveAt: null,
    });
  }

  saveUserRewardResult() {
    return {
      id: this.id,
      userId: this.userId,
      event: {
        ...this.event.getEventInfo(),
      },
      reward: {
        ...this.reward.getInfo(),
      },
      receiveAt: this.receiveAt ?? null,
    };
  }
}
