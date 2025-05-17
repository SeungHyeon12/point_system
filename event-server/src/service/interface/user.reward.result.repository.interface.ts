import { UserRewardResult } from 'src/domain/vo/reward/user.reward.result';

export interface UserRewardResultRepositoryInterface {
  create(userRewardResult: UserRewardResult): Promise<void>;
  getAllByUserId(userId: string): Promise<UserRewardResult[]>;
  getAll(): Promise<UserRewardResult[]>;
  getById(id: string): Promise<UserRewardResult | null>;
  update(userResult: UserRewardResult): Promise<void>;
}
