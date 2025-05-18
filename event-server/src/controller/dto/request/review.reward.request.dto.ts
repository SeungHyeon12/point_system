import { IsEnum, IsString } from 'class-validator';

export class ReviewRewardtRequestDTO {
  @IsString()
  rewardResultId: string;

  @IsString()
  @IsEnum(['APPROVE', 'REJECT'])
  status: 'APPROVE' | 'REJECT';
}
