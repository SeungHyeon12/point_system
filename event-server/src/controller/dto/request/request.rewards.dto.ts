import { IsString } from 'class-validator';

export class RequestRewardsDTO {
  @IsString()
  userId: string;

  @IsString()
  eventId: string;
}
