import { UserRole } from 'src/domain/vo/user.role';

export class UserRoleScopeHelper {
  static scope = {
    REQUEST_REWARD: 'get:reward',
    ENROLL_EVENT: 'put:event',
    ENROLL_REWARD: 'put:reward',
    GET_REWARD: 'get:reward',
  };

  static getScopeByRole(role: UserRole) {
    switch (role) {
      case 'USER':
        return [this.scope.REQUEST_REWARD];
      case 'OPERATOR':
        return [this.scope.ENROLL_EVENT, this.scope.ENROLL_REWARD];
      case 'AUDITOR':
        return [this.scope.GET_REWARD];
      case 'ADMIN':
        return [
          this.scope.REQUEST_REWARD,
          this.scope.ENROLL_EVENT,
          this.scope.ENROLL_REWARD,
          this.scope.GET_REWARD,
        ];
    }
  }
}
