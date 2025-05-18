import { createUniqueId } from 'src/common/uitls/createUniqueId.function';
import { EventCondition } from './vo/condition/event.condition';
import { Reward } from './vo/reward/reward';

export class Event {
  private readonly id: string;
  private eventName: string;
  private eventCondition: EventCondition;
  private isActive: boolean;
  private rewards: Reward[];
  private startDate: string;
  private endDate: string;

  constructor(args: {
    id: string;
    eventName: string;
    eventCondition: EventCondition;
    isActive: boolean;
    rewards: Reward[];
    startDate: string;
    endDate: string;
  }) {
    this.id = args.id;
    this.eventName = args.eventName;
    this.eventCondition = args.eventCondition;
    this.isActive = args.isActive;
    this.rewards = args.rewards;
    this.startDate = args.startDate;
    this.endDate = args.endDate;
  }

  static createEvent(args: {
    eventName: string;
    eventCondition: EventCondition;
    rewards: Reward[];
    startDate: string;
    endDate: string;
  }) {
    return new Event({
      id: createUniqueId(),
      eventName: args.eventName,
      eventCondition: args.eventCondition,
      // 혹시라도 event 를 바로 노출시키고 싶지 않을 수 있으므로 active를 통해서 킬 수 있도록 한다.
      isActive: false,
      rewards: args.rewards,
      startDate: args.startDate,
      endDate: args.endDate,
    });
  }

  activeEvent() {
    this.isActive = true;
  }

  inactiveEvent() {
    this.isActive = false;
  }

  // 추첨여부 외에는 유저가 직접 조건을 만족시키고 응답할 수 있기 때문에 이를 사용한다.
  isNeedReview() {
    return this.eventCondition === EventCondition.LOTTERY;
  }

  getEventRewards() {
    return this.rewards;
  }

  getEventCondition() {
    return this.eventCondition;
  }

  // update는 Put 을 통해서 form 으로 수정하도록 한다.
  updateEvent(args: {
    eventName: string;
    eventCondition: EventCondition;
    rewards: Reward[];
    startDate: string;
    endDate: string;
  }) {
    this.eventName = args.eventName;
    this.eventCondition = args.eventCondition;
    this.rewards = args.rewards;
    this.startDate = args.startDate;
    this.endDate = args.endDate;
  }

  getEventInfo() {
    return {
      id: this.id,
      eventName: this.eventName,
      eventCondition: this.eventCondition,
      isActive: this.isActive,
      rewards: this.rewards,
      startDate: this.startDate,
      endDate: this.endDate,
    };
  }

  save() {
    return {
      id: this.id,
      eventName: this.eventName,
      eventCondition: this.eventCondition,
      isActive: this.isActive,
      rewards: this.rewards.map((reward) => ({
        ...reward.getRewardInfo(),
      })),
      startDate: this.startDate,
      endDate: this.endDate,
    };
  }
}
