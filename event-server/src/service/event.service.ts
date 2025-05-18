import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EventRepositoryInterface } from './interface/event.repository.interface';
import { RewardRepositoryInterface } from './interface/reward.repository.interface';
import { UserRewardResultRepositoryInterface } from './interface/user.reward.result.repository.interface';
import { RewardType } from 'src/domain/vo/reward/reward.type';
import { Reward } from 'src/domain/vo/reward/reward';
import { EventCondition } from 'src/domain/vo/condition/event.condition';
import { Event } from 'src/domain/event';
import { EventConditionHelper } from './event.condition.helper';
import { UserRewardResult } from 'src/domain/vo/reward/user.reward.result';

@Injectable()
export class EventService {
  constructor(
    @Inject('EVENT_REPOSITORY')
    private readonly eventRepository: EventRepositoryInterface,
    @Inject('REWARD_REPOSITORY')
    private readonly rewardRepository: RewardRepositoryInterface,
    @Inject('USER_REWARD_RESULT_REPOSITORY')
    private readonly userRewardResultRpository: UserRewardResultRepositoryInterface,
    private readonly eventConditionHelper: EventConditionHelper,
  ) {}

  ///rewards
  async createReward(args: {
    rewardName: string;
    rewardType: RewardType;
    rewardAmount: number;
  }) {
    const reward = Reward.createReward({
      ...args,
    });
    await this.rewardRepository.create(reward);
  }

  async getRewardById(args: { id: string }) {
    const reward = await this.rewardRepository.getById(args.id);
    if (!reward) {
      throw new Error('Reward not found');
    }
    return reward.getRewardInfo();
  }

  async getAllRewards() {
    const rewards = await this.rewardRepository.getAll();
    return rewards.map((reward) => reward.getRewardInfo());
  }

  ///events
  async createEvent(args: {
    eventName: string;
    eventCondition: EventCondition;
    startDate: string;
    endDate: string;
    rewardIds: string[];
  }) {
    const rewards = await this.rewardRepository.getAllByIds(args.rewardIds);
    if (rewards.length === 0) {
      throw new NotFoundException('Reward not found');
    }

    const event = Event.createEvent({
      eventName: args.eventName,
      eventCondition: args.eventCondition,
      rewards,
      startDate: args.startDate,
      endDate: args.endDate,
    });
    await this.eventRepository.create(event);
  }

  async getEvents() {
    const events = await this.eventRepository.getAllWithoutDeleted();
    return events.map((event) => {
      return event.getEventInfo();
    });
  }

  async getAllEvents() {
    const events = await this.eventRepository.getAll();
    return events.map((event) => {
      return {
        ...event.getEventInfo(),
        rewards: event
          .getEventRewards()
          .map((reward) => reward.getRewardInfo()),
      };
    });
  }

  async getEventById(args: { id: string }) {
    const event = await this.eventRepository.getById(args.id);
    if (!event) {
      throw new NotFoundException('Event not found');
    }
    return {
      ...event.getEventInfo(),
      rewards: event.getEventRewards().map((reward) => reward.getRewardInfo()),
    };
  }

  ///user reward result
  async getUserOwnRewardResults(args: { userId: string }) {
    const userRewardResult =
      await this.userRewardResultRpository.getAllByUserId(args.userId);
    return userRewardResult.map((userRewardResult) =>
      userRewardResult.getInfo(),
    );
  }

  async getAllUserRewardResults() {
    const userRewardResults = await this.userRewardResultRpository.getAll();
    return userRewardResults.map((userRewardResult) =>
      userRewardResult.getInfo(),
    );
  }

  async reviewRewardResult(args: {
    rewardResultId: string;
    status: 'APPROVE' | 'REJECT';
  }) {
    const userRewardResult = await this.userRewardResultRpository.getById(
      args.rewardResultId,
    );

    if (!userRewardResult) {
      throw new NotFoundException('User reward result not found');
    }

    if (args.status === 'APPROVE') {
      userRewardResult.approveReward();
    } else if (args.status === 'REJECT') {
      userRewardResult.rejectReward();
    }

    await this.userRewardResultRpository.create(userRewardResult);
  }

  async requestReward(args: { userId: string; eventId: string }) {
    const event = await this.eventRepository.getById(args.eventId);
    if (!event) {
      throw new NotFoundException('Event not found');
    }
    const condition = event.getEventCondition();
    const isConditionCompleted =
      await this.eventConditionHelper.validateByCondition({
        condition,
        userId: args.userId,
      });
    if (!isConditionCompleted) {
      throw new ConflictException('mission not completed');
    }

    const rewardResult = event.isNeedReview()
      ? UserRewardResult.registerNeedReviewConditionReward({
          userId: args.userId,
          event,
        })
      : UserRewardResult.rewardSuccessResult({
          userId: args.userId,
          event,
        });
    try {
      await this.userRewardResultRpository.create(rewardResult);
    } catch (err) {
      if (err instanceof Error && err.message === 'ALREADY_EXIST') {
        throw new ConflictException('event already registered');
      }
      throw err;
    }
  }

  async getRequests() {
    const requests = await this.userRewardResultRpository.getAll();
    return requests.map((request) => {
      return {
        ...request.getInfo(),
      };
    });
  }
}
