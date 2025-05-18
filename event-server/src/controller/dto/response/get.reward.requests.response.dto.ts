import { GetRewardRequestResponseDTO } from './get.reward.request.response.dto';

export class GetRewardRequestsResponseDTO {
  requests: GetRewardRequestResponseDTO[];

  constructor(requests: GetRewardRequestResponseDTO[]) {
    this.requests = requests;
  }
}
