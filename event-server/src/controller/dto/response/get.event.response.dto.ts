import { EventCondition } from 'src/domain/vo/condition/event.condition';
import { GetRewardResponseDtO } from './get.reward.response.dto';
import { RewardType } from 'src/domain/vo/reward/reward.type';

export class GetEventResponseDto {
  id: string;
  eventName: string;
  eventCondition: EventCondition;
  isActive: boolean;
  startDate: string;
  endDate: string;
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
    this.rewards = data.rewards.map((reward) => {
      return new GetRewardResponseDtO({
        id: reward.id,
        rewardName: reward.rewardName,
        rewardType: reward.rewardType,
        rewardAmount: reward.rewardAmount,
      });
    });
  }
}
