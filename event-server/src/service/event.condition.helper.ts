import { EventCondition } from '../domain/vo/condition/event.condition';

export class EventConditionHandler {
  static validateByCondition(args: {
    condition: EventCondition;
    value: unknown;
  }) {
    switch (args.condition) {
      case EventCondition.LOGIN_SEVEN_DAYS:
        return this.validateLoginSevenDaysCondition(args.value);
      case EventCondition.INVITE_THREE_FRIENDS:
        return this.validtateInviteThreeFriendsCondition(args.value);
      default:
        throw new Error('Invalid event condition');
    }
  }

  static validtateInviteThreeFriendsCondition(invitedFriendList: unknown) {
    if (!Array.isArray(invitedFriendList)) {
      return false;
    }
    if (invitedFriendList.length < 3) {
      return false;
    }

    return true;
  }

  static validateLoginSevenDaysCondition(userLoginDays: unknown) {
    if (typeof userLoginDays !== 'number') {
      return false;
    }
    if (userLoginDays < 7) {
      return false;
    }

    return true;
  }
}
