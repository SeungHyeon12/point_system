import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { EventCondition } from '../domain/vo/condition/event.condition';
import { DataRequester } from './interface/data.requester.interface';

@Injectable()
export class EventConditionHelper {
  constructor(
    @Inject('DATA_REQUESTER')
    private readonly dataRequester: DataRequester,
  ) {}

  async validateByCondition(args: {
    condition: EventCondition;
    userId: string;
  }) {
    switch (args.condition) {
      case EventCondition.LOGIN_SEVEN_DAYS:
        return await this.validateLoginSevenDaysCondition(args.userId);
      case EventCondition.INVITE_THREE_FRIENDS:
        return await this.validtateInviteThreeFriendsCondition(args.userId);
      default:
        return true;
    }
  }

  private async validtateInviteThreeFriendsCondition(userId: string) {
    try {
      const userData = await this.dataRequester.requestUserData(userId);
      if (userData.recommenderCount < 3) {
        return false;
      }
      return true;
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'USER_NOT_FOUND') {
          throw new NotFoundException('not found user');
        }
      }
      throw new InternalServerErrorException('currently server unavailable');
    }
  }

  private async validateLoginSevenDaysCondition(userId: string) {
    try {
      const userData = await this.dataRequester.requestUserData(userId);
      if (userData.loginDays < 7) {
        return false;
      }
      return true;
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'USER_NOT_FOUND') {
          throw new NotFoundException('not found user');
        }
      }
      throw new InternalServerErrorException('currently server unavailable');
    }
  }
}
