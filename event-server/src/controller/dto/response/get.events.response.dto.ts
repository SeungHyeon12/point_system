import { ApiProperty } from '@nestjs/swagger';
import { RewardType } from 'src/domain/vo/reward/reward.type';
import { GetEventResponseDto } from './get.event.response.dto';
import { EventCondition } from 'src/domain/vo/condition/event.condition';

export class GetEventsResponseDTO {
  @ApiProperty({
    description: '이벤트 목록',
    type: [GetEventResponseDto],
  })
  events: GetEventResponseDto[];

  constructor(
    data: {
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
    }[],
  ) {
    this.events = data.map(
      (event) =>
        new GetEventResponseDto({
          ...event,
        }),
    );
  }
}
