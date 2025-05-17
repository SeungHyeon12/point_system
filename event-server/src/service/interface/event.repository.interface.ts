import { Event } from 'src/domain/event';

export interface EventRepositoryInterface {
  getEventById(id: string): Promise<Event>;
  getEvents(): Promise<Event[]>;
}
