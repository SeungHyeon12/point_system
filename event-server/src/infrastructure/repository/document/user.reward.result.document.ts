import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { RewardType } from 'src/domain/vo/reward/reward.type';
import { UserRewardResultStatus } from 'src/domain/vo/reward/user.reward.result.status';
import { BaseSchema } from '../../../common/schema/base.schema';
import { EventCondition } from 'src/domain/vo/condition/event.condition';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: false })
export class PartialEventSnapshotSchema {
  @Prop({ required: true, type: String })
  _id: string;

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

@Schema({ timestamps: false })
export class PartialRewardSnapshotSchema {
  @Prop({ required: true, type: String })
  _id: string;

  @Prop({ type: String })
  rewardName: string;

  @Prop({ type: String, enum: RewardType })
  rewardType: boolean;

  @Prop({ type: Number })
  rewardAmount: number;
}

@Schema({ timestamps: true, collection: 'user_reward_results' })
export class UserRewardResultDocument extends BaseSchema {
  @Prop({ required: true })
  _id: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true, type: String })
  eventId: string;

  @Prop({ type: PartialEventSnapshotSchema, required: true })
  eventPartialSnapshot: {
    _id: string;
    eventName: string;
    eventCondition: EventCondition;
    isActive: boolean;
    startDate: string;
    endDate: string;
  };

  @Prop({ type: [PartialRewardSnapshotSchema], required: true })
  rewardsPartialSnaopshot: {
    _id: string;
    rewardName: string;
    rewardType: RewardType;
    rewardAmount: number;
  }[];

  @Prop({ required: true, enum: UserRewardResultStatus })
  status: UserRewardResultStatus;

  @Prop({ required: true, type: Boolean })
  isConditionCompleted: boolean;

  @Prop({ type: String, required: false, default: null })
  rewardReceivedAt: string | null;
}

export type UserRewardResultSchema = HydratedDocument<UserRewardResultDocument>;
export const UserRewardResultSchema = SchemaFactory.createForClass(
  UserRewardResultDocument,
);
UserRewardResultSchema.index({ userId: 1, eventId: 1 }, { unique: true });
