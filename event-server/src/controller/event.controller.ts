import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { EventService } from 'src/service/event.service';
import { CreateRewardRequestDTO } from './dto/request/create.reward.request.dto';
import { GetRewardsResponseDTO } from './dto/response/get.rewards.response.dto';
import { GetRewardResponseDtO } from './dto/response/get.reward.response.dto';
import { CreateEventRequestDTO } from './dto/request/create.event.request.dto';
import { GetEventsResponseDTO } from './dto/response/get.events.response.dto';
import { GetEventResponseDto } from './dto/response/get.event.response.dto';
import { RequestRewardsDTO } from './dto/request/request.rewards.dto';
import { GetRewardRequestsResponseDTO } from './dto/response/get.reward.requests.response.dto';
import { ReviewRewardtRequestDTO } from './dto/request/review.reward.request.dto';

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  async createEvent(@Body() createEventRequestDTO: CreateEventRequestDTO) {
    await this.eventService.createEvent({
      ...createEventRequestDTO,
    });
  }

  @Get()
  async getEvents() {
    const data = await this.eventService.getAllEvents();
    return new GetEventsResponseDTO(data);
  }

  @Get(':eventId')
  async getEvent(@Param('eventId') eventId: string) {
    const data = await this.eventService.getEventById({ id: eventId });
    return new GetEventResponseDto(data);
  }

  @Post('rewards')
  async createReward(@Body() createRewardRequestDTO: CreateRewardRequestDTO) {
    await this.eventService.createReward({
      ...createRewardRequestDTO,
    });
  }

  @Get('rewards')
  async getRewards() {
    const rewards = await this.eventService.getAllRewards();
    return new GetRewardsResponseDTO(rewards);
  }

  @Post('reward-requests')
  async requestReward(@Body() requestRewardsDTO: RequestRewardsDTO) {
    await this.eventService.requestReward(requestRewardsDTO);
  }

  @Post('reward-requests/review')
  async reviewRequest(@Body() requestRewardsDTO: ReviewRewardtRequestDTO) {
    await this.eventService.reviewRewardResult(requestRewardsDTO);
  }

  @Get('reward-requests')
  async getRewardRequests() {
    const data = await this.eventService.getAllUserRewardResults();
    return new GetRewardRequestsResponseDTO(data);
  }

  @Get('reward-requests/users/:userId')
  async getUserRequests(@Param('userId') userId: string) {
    const data = await this.eventService.getUserOwnRewardResults({ userId });
    return new GetRewardRequestsResponseDTO(data);
  }

  @Get('rewards/:rewardId')
  async getReward(@Param('rewardId') rewardId: string) {
    const reward = await this.eventService.getRewardById({ id: rewardId });
    return new GetRewardResponseDtO(reward);
  }
}
