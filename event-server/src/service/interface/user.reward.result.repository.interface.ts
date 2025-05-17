import { UserRewardResult } from 'src/domain/vo/reward/user.reward.result';

export interface UserRewardResultRepositoryInterface {
  create(userRewardResult: UserRewardResult): Promise<void>;
  getAllByUserId(userId: string): Promise<UserRewardResult[]>;
  getAll(): Promise<UserRewardResult[]>;
}
