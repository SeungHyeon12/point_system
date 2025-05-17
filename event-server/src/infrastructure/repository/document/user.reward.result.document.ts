import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { RewardType } from 'src/domain/vo/reward/reward.type';
import { UserRewardResultStatus } from 'src/domain/vo/reward/user.reward.result.status';
import { BaseSchema } from '../../../common/schema/base.schema';
import { BaseSchemaMethod } from 'src/common/schema/base.schema.method.interface';
import { UserRewardResult } from 'src/domain/vo/reward/user.reward.result';
import { EventCondition } from 'src/domain/vo/condition/event.condition';
import { HydratedDocument } from 'mongoose';

@Schema({ _id: false, timestamps: false })
export class PartialEventSnapshotSchema {
  @Prop({ required: true, type: String })
  id: string;

  @Prop({ type: String })
  eventName: string;

  @Prop({ required: true, type: String, enum: EventCondition })
  eventCondition: EventCondition;

  @Prop({ type: Boolean })
  isActive: boolean;

  @Prop({ type: String })
  startDate: string;

  @Prop({ type: String })
  endDate: string;
}

@Schema({ _id: false, timestamps: false })
export class PartialRewardSnapshotSchema {
  @Prop({ required: true, type: String })
  id: string;

  @Prop({ type: String })
  rewardName: string;

  @Prop({ type: Boolean })
  rewardType: boolean;

  @Prop({ type: String })
  rewardAmount: string;
}

@Schema({ timestamps: true })
export class UserRewardResultDocument
  extends BaseSchema
  implements BaseSchemaMethod<UserRewardResult>
{
  @Prop({ required: true })
  _id: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ type: PartialEventSnapshotSchema, required: true })
  eventPartialSnapshot: {
    id: string;
    eventName: string;
    eventCondition: EventCondition;
    isActive: boolean;
    startDate: string;
    endDate: string;
  };

  @Prop({ type: PartialRewardSnapshotSchema, required: true })
  rewardPartialSnaopshot: {
    id: string;
    rewardName: string;
    rewardType: RewardType;
    rewardAmount: number;
  };

  @Prop({ required: true, enum: UserRewardResultStatus })
  status: UserRewardResultStatus;

  @Prop({ required: true, type: Boolean })
  isConditionCompleted: boolean;

  @Prop({ type: String, required: false, default: null })
  rewardReceivedAt: string | null;

  toDomain(): UserRewardResult {
    return new UserRewardResult({
      id: this._id,
      userId: this.userId,
      eventPartialInfo: {
        id: this.eventPartialSnapshot.id,
        eventName: this.eventPartialSnapshot.eventName,
        isActive: this.eventPartialSnapshot.isActive,
        eventCondition: this.eventPartialSnapshot.eventCondition,
        startDate: this.eventPartialSnapshot.startDate,
        endDate: this.eventPartialSnapshot.endDate,
      },
      rewardPartialInfo: {
        id: this.rewardPartialSnaopshot.id,
        rewardName: this.rewardPartialSnaopshot.rewardName,
        rewardType: this.rewardPartialSnaopshot.rewardType,
        rewardAmount: this.rewardPartialSnaopshot.rewardAmount,
      },
      status: this.status,
      isConditionCompleted: this.isConditionCompleted,
      rewardReceivedAt: this.rewardReceivedAt,
    });
  }
}

export type UserRewardResultSchema = HydratedDocument<
  UserRewardResultDocument,
  BaseSchemaMethod<UserRewardResult>
>;
export const UserRewardResultSchema = SchemaFactory.createForClass(
  UserRewardResultDocument,
);
