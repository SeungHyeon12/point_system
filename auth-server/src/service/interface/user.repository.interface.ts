import { User } from 'src/domain/user';

export interface UserRepositoryInterface {
  create(user: User): Promise<void>;
  getUserByEmail(email: string): Promise<User | null>;
  getUserById(id: string): Promise<User | null>;
  getRecommenderCount(id: string): Promise<number>;
  update(user: User): Promise<void>;
}
