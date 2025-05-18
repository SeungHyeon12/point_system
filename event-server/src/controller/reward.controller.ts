import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { EventService } from 'src/service/event.service';
import { CreateRewardRequestDTO } from './dto/request/create.reward.request.dto';
import { GetRewardsResponseDTO } from './dto/response/get.rewards.response.dto';
import { GetRewardResponseDtO } from './dto/response/get.reward.response.dto';
import { RequestRewardsDTO } from './dto/request/request.rewards.dto';
import { GetRewardRequestsResponseDTO } from './dto/response/get.reward.requests.response.dto';
import { ReviewRewardRequestDTO } from './dto/request/review.reward.request.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiCommonOkResponse } from 'src/common/response/common.response.decorator';
import { CommonResponseDto } from 'src/common/response/common.response.dto';

@ApiTags('Rewards')
@Controller('rewards')
export class RewardController {
  constructor(private readonly eventService: EventService) {}

  @Post('')
  @ApiOperation({
    summary: '보상 생성',
  })
  async createReward(@Body() createRewardRequestDTO: CreateRewardRequestDTO) {
    await this.eventService.createReward({
      ...createRewardRequestDTO,
    });
    return new CommonResponseDto<null>({ data: null });
  }

  @Get('')
  @ApiOperation({
    summary: '보상 목록 조회',
  })
  @ApiCommonOkResponse(GetRewardsResponseDTO)
  async getRewards() {
    const rewards = await this.eventService.getAllRewards();
    const response = new GetRewardsResponseDTO(rewards);
    return new CommonResponseDto<GetRewardsResponseDTO>({
      data: response,
    });
  }

  @Post('reward-requests')
  @ApiOperation({
    summary: '보상 요청',
  })
  async requestReward(@Body() requestRewardsDTO: RequestRewardsDTO) {
    await this.eventService.requestReward(requestRewardsDTO);
    return new CommonResponseDto<null>({ data: null });
  }

  @Post('reward-requests/review')
  @ApiOperation({
    summary: '보상 요청 리뷰',
  })
  async reviewRequest(@Body() requestRewardsDTO: ReviewRewardRequestDTO) {
    await this.eventService.reviewRewardResult(requestRewardsDTO);
    return new CommonResponseDto<null>({ data: null });
  }

  @Get('reward-requests')
  @ApiOperation({
    summary: '보상 요청 목록 조회',
  })
  @ApiCommonOkResponse(GetRewardRequestsResponseDTO)
  async getRewardRequests() {
    const data = await this.eventService.getAllUserRewardResults();
    const response = new GetRewardRequestsResponseDTO(data);
    return new CommonResponseDto<GetRewardRequestsResponseDTO>({
      data: response,
    });
  }

  @Get('reward-requests/users/:userId')
  @ApiOperation({
    summary: '유저 보상 요청 목록 조회',
  })
  @ApiCommonOkResponse(GetRewardRequestsResponseDTO)
  async getUserRequests(@Param('userId') userId: string) {
    const data = await this.eventService.getUserOwnRewardResults({ userId });
    const response = new GetRewardRequestsResponseDTO(data);
    return new CommonResponseDto<GetRewardRequestsResponseDTO>({
      data: response,
    });
  }

  @Get('rewards/:rewardId')
  @ApiOperation({
    summary: '보상 개별 조회',
  })
  @ApiCommonOkResponse(GetRewardResponseDtO)
  async getReward(@Param('rewardId') rewardId: string) {
    const reward = await this.eventService.getRewardById({ id: rewardId });
    const response = new GetRewardResponseDtO(reward);
    return new CommonResponseDto<GetRewardResponseDtO>({
      data: response,
    });
  }
}
