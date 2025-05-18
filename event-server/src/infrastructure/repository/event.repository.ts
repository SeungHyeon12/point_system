import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EventDocument, EventSchema } from './document/event.document';
import { Event } from 'src/domain/event';
import { EventRepositoryInterface } from 'src/service/interface/event.repository.interface';
import { Reward } from 'src/domain/vo/reward/reward';

@Injectable()
export class EventRepository implements EventRepositoryInterface {
  constructor(
    @InjectModel(EventDocument.name)
    private readonly eventModel: Model<EventSchema>,
  ) {}

  async create(event: Event): Promise<void> {
    const data = event.save();
    await this.eventModel.create({
      ...data,
      _id: data.id,
      rewards: data.rewards.map((reward) => ({
        ...reward,
        _id: reward.id,
      })),
    });
  }

  async getById(id: string): Promise<Event | null> {
    const data = await this.eventModel.findById(id);
    return data ? this.toDomain(data) : null;
  }

  async getAllWithoutDeleted(): Promise<Event[]> {
    const data = await this.eventModel
      .find({ deletedAt: null })
      .sort({ createdAt: -1 });
    return data.map((event) => this.toDomain(event));
  }

  async getAll(args: { id?: string; limit: number }): Promise<Event[]> {
    const query = args?.id ? { _id: { $lt: args.id } } : {};
    const data = await this.eventModel
      .find(query)
      .sort({ _id: -1 })
      .limit(args.limit + 1);
    return data.map((event) => this.toDomain(event));
  }

  toDomain(eventSchema: EventSchema): Event {
    return new Event({
      id: eventSchema._id,
      eventName: eventSchema.eventName,
      eventCondition: eventSchema.eventCondition,
      isActive: eventSchema.isActive,
      rewards: eventSchema.rewards.map(
        (reward) =>
          new Reward({
            id: reward._id,
            rewardName: reward.rewardName,
            rewardType: reward.rewardType,
            rewardAmount: reward.rewardAmount,
          }),
      ),
      startDate: eventSchema.startDate,
      endDate: eventSchema.endDate,
    });
  }
}
