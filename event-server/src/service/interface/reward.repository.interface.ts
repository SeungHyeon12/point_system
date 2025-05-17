import { Reward } from 'src/domain/vo/reward/reward';

export interface RewardRepositoryInterface {
  getRewardBy(id: string): Promise<Reward>;
  getRewards(): Promise<Reward[]>;
}
