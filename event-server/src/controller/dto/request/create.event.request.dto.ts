import { IsDateString, IsEnum, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { EventCondition } from 'src/domain/vo/condition/event.condition';

export class CreateEventRequestDTO {
  @ApiProperty({
    description: '이벤트 이름',
    example: '출석 이벤트',
  })
  @IsString()
  eventName: string;

  @ApiProperty({
    description: '이벤트 조건 (ENUM)',
    enum: EventCondition,
    example: EventCondition.INVITE_THREE_FRIENDS, // 실제 enum 값 중 하나로 예시
  })
  @IsString()
  @IsEnum(EventCondition)
  eventCondition: EventCondition;

  @ApiProperty({
    description: '이벤트 시작 날짜 (ISO8601 형식)',
    example: '2025-06-01T00:00:00Z',
  })
  @IsDateString()
  startDate: string;

  @ApiProperty({
    description: '이벤트 종료 날짜 (ISO8601 형식)',
    example: '2025-06-30T23:59:59Z',
  })
  @IsDateString()
  endDate: string;

  @ApiProperty({
    description: '지급할 보상 ID 배열',
    example: ['reward123', 'reward456'],
    isArray: true,
    type: String,
  })
  @IsString({ each: true })
  rewardIds: string[];
}
