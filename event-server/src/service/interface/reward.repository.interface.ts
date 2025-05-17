import { Reward } from 'src/domain/vo/reward/reward';

export interface RewardRepositoryInterface {
  create(reward: Reward): Promise<void>;
  getById(id: string): Promise<Reward | null>;
  getAll(): Promise<Reward[]>;
}
