import { createUniqueId } from 'src/common/uitls/createUniqueId.function';
import {
  hashPassword,
  verifyPassword,
} from 'src/common/uitls/hashpassword.function';
import { UserRole } from 'src/domain/vo/user.role';
import {
  ScopeValues,
  UserRoleScopeHelper,
} from 'src/domain/vo/user.role.scope.helper';

export class User {
  private readonly id: string;
  private email: string;
  private password: string;
  private userRole: UserRole;
  private recommenderId?: string;

  constructor(args: {
    id: string;
    email: string;
    password: string;
    userRole: UserRole;
    recommenderId?: string;
  }) {
    this.id = args.id;
    this.email = args.email;
    this.password = args.password;
    this.userRole = args.userRole;
    this.recommenderId = args.recommenderId;
  }

  static async createUser(args: {
    email: string;
    rawPassword: string;
    userRole: UserRole;
    recommenderId?: string;
  }) {
    const hashedPassword = await hashPassword(args.rawPassword);
    const id = createUniqueId();
    return new User({
      id,
      email: args.email,
      password: hashedPassword,
      userRole: args.userRole,
      recommenderId: args.recommenderId,
    });
  }

  async isVerifiedPassword(requestPassword: string) {
    return await verifyPassword(requestPassword, this.password);
  }

  getAvailableScopes() {
    return UserRoleScopeHelper.getScopeByRole(this.userRole);
  }

  isScopesCorrect(scopes: string[]) {
    const availableScopes = this.getAvailableScopes();
    return scopes.every((scope) =>
      availableScopes.includes(scope as ScopeValues),
    );
  }

  getUserInfo() {
    return {
      id: this.id,
      email: this.email,
      userRole: this.userRole,
      recommenderId: this.recommenderId,
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

  getId() {
    return this.id;
  }

  getRole() {
    return this.userRole;
  }
}
