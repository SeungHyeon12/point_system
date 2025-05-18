import { IsDateString, IsEnum, IsString } from 'class-validator';
import { EventCondition } from 'src/domain/vo/condition/event.condition';

export class CreateEventRequestDTO {
  @IsString()
  eventName: string;

  @IsString()
  @IsEnum(EventCondition)
  eventCondition: EventCondition;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsString({ each: true })
  rewardIds: string[];
}
