import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RequestRewardsDTO {
  @ApiProperty({
    description: '유저 ID',
    example: 'user_abc123',
  })
  @IsString()
  userId: string;

  @ApiProperty({
    description: '이벤트 ID',
    example: 'event_xyz456',
  })
  @IsString()
  eventId: string;
}
