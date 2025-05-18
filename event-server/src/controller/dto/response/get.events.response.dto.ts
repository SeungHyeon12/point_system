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

  @ApiProperty({
    description: '값이 더 있는지 여부',
    example: true,
  })
  hasMore: boolean;

  @ApiProperty({
    description: '다음 커서 (ulid 값 base62 인코딩)',
    example: 'Dkjfjsldkj1kvjaljas',
  })
  nextCursor: string | null;

  constructor(data: {
    hasMore: boolean;
    nextCursor: string | null;
    events: {
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
    }[];
  }) {
    this.hasMore = data.hasMore;
    this.nextCursor = data.nextCursor;
    this.events = data.events.map(
      (event) =>
        new GetEventResponseDto({
          ...event,
        }),
    );
  }
}
