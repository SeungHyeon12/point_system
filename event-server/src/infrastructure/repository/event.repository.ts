import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EventDocument, EventSchema } from './document/event.document';
import { Event } from 'src/domain/event';
import { EventRepositoryInterface } from 'src/service/interface/event.repository.interface';

@Injectable()
export class EventRepository implements EventRepositoryInterface {
  constructor(
    @InjectModel(EventDocument.name)
    private readonly eventModel: Model<EventSchema>,
  ) {}

  async create(event: Event): Promise<void> {
    try {
      await this.eventModel.create({ ...event.save() });
    } catch (err: unknown) {
      const mongoDbError = err as { code: number };
      if (mongoDbError?.code === 11000) {
        throw new Error('ALREADY_EXIST');
      }
      throw err;
    }
  }

  async getById(id: string): Promise<Event | null> {
    const data = await this.eventModel.findById(id);
    return data ? data.toDomain() : null;
  }

  async getAllWithoutDeleted(): Promise<Event[]> {
    const data = await this.eventModel
      .find({ deletedAt: null })
      .sort({ createdAt: -1 });
    return data.map((event) => event.toDomain());
  }

  async getAll(): Promise<Event[]> {
    const data = await this.eventModel.find().sort({ createdAt: -1 });
    return data.map((event) => event.toDomain());
  }
}
