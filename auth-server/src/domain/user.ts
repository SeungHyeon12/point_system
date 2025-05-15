import { createUniqueId } from 'src/common/uitls/createUniqueId.function';
import {
  hashPassword,
  verifyPassword,
} from 'src/common/uitls/hashpassword.function';
import { UserRole } from 'src/domain/vo/user.role';

export class User {
  private readonly id: string;
  private email: string;
  private password: string;
  private userRole: UserRole;

  constructor(args: {
    id: string;
    email: string;
    password: string;
    userRole: UserRole;
  }) {
    this.id = args.id;
    this.email = args.email;
    this.password = args.password;
    this.userRole = args.userRole;
  }

  static async createUser(args: {
    email: string;
    rawPassword: string;
    userRole: UserRole;
  }) {
    const hashedPassword = await hashPassword(args.rawPassword);
    const id = createUniqueId();
    return new User({
      id,
      email: args.email,
      password: hashedPassword,
      userRole: args.userRole,
    });
  }

  async checkPassword(requestPassword: string) {
    return await verifyPassword(requestPassword, this.password);
  }

  getUserInfo() {
    return {
      id: this.id,
      email: this.email,
      userRole: this.userRole,
    };
  }

  getCreateUserInfo() {
    return {
      id: this.id,
      email: this.email,
      password: this.password,
      userRole: this.userRole,
    };
  }
}
