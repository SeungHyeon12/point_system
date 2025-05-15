import { User } from 'src/domain/user';

export interface UserRepositoryInterface {
  createUser(user: User): Promise<void>;
  getUserByEmail(email: string): Promise<User | null>;
  getUserById(id: string): Promise<User | null>;
}
