import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsString,
  ValidateNested,
} from 'class-validator';
import { EventCondition } from 'src/domain/vo/condition/event.condition';
import { GetRewardResponseDtO } from './get.reward.response.dto';
import { Type } from 'class-transformer';
import { RewardType } from 'src/domain/vo/reward/reward.type';

export class GetEventResponseDto {
  @IsString()
  id: string;

  @IsString()
  eventName: string;

  @IsString()
  @IsEnum(EventCondition)
  eventCondition: EventCondition;

  @IsBoolean()
  isActive: boolean;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => GetRewardResponseDtO)
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
