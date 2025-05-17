import { Event } from 'src/domain/event';

export interface EventRepositoryInterface {
  create(event: Event): Promise<void>;
  getById(id: string): Promise<Event | null>;
  getAllWithoutDeleted(): Promise<Event[]>;
  getAll(): Promise<Event[]>;
}
