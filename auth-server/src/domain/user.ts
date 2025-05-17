import { createUniqueId } from 'src/common/uitls/createUniqueId.function';
import {
  hashPassword,
  verifyPassword,
} from 'src/common/uitls/hashpassword.function';
import { isDifferentDay } from 'src/common/uitls/is.diffrent.day.function';
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
  private lastLoginDate?: string;
  private loginDays: number;

  constructor(args: {
    id: string;
    email: string;
    password: string;
    userRole: UserRole;
    recommenderId?: string;
    lastLoginDate?: string;
    loginDays: number;
  }) {
    this.id = args.id;
    this.email = args.email;
    this.password = args.password;
    this.userRole = args.userRole;
    this.recommenderId = args.recommenderId;
    this.lastLoginDate = args.lastLoginDate;
    this.loginDays = args.loginDays;
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
      loginDays: 0,
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

  signIn() {
    if (!this.lastLoginDate) {
      this.loginDays += 1;
      this.lastLoginDate = new Date().toISOString();
      return;
    }
    if (isDifferentDay(new Date(this.lastLoginDate), new Date())) {
      this.loginDays += 1;
    }
    this.lastLoginDate = new Date().toISOString();
  }

  getUserInfo() {
    return {
      id: this.id,
      email: this.email,
      userRole: this.userRole,
      recommenderId: this.recommenderId,
      lastLoginDate: this.lastLoginDate,
      loginDays: this.loginDays,
    };
  }

  getCreateUserInfo() {
    return {
      id: this.id,
      email: this.email,
      password: this.password,
      userRole: this.userRole,
      loginDays: this.loginDays,
    };
  }

  getId() {
    return this.id;
  }

  getRole() {
    return this.userRole;
  }
}
