import { ApiProperty } from '@nestjs/swagger';
import { GetRewardRequestResponseDTO } from './get.reward.request.response.dto';

export class GetRewardRequestsResponseDTO {
  @ApiProperty({
    description: '보상 요청 목록',
    type: [GetRewardRequestResponseDTO],
  })
  requests: GetRewardRequestResponseDTO[];

  constructor(requests: GetRewardRequestResponseDTO[]) {
    this.requests = requests;
  }
}
