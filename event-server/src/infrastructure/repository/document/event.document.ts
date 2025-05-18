import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { EventCondition } from 'src/domain/vo/condition/event.condition';
import { RewardType } from 'src/domain/vo/reward/reward.type';
import { BaseSchema } from 'src/common/schema/base.schema';

@Schema({ _id: false, timestamps: false })
export class RewardPartialSchema {
  @Prop({ required: true, type: String })
  _id: string;

  @Prop({ required: true, type: String })
  rewardName: string;

  @Prop({ required: true, enum: RewardType, type: String })
  rewardType: RewardType;

  @Prop({ required: true, type: Number })
  rewardAmount: number;
}

@Schema({ timestamps: true })
export class EventDocument extends BaseSchema {
  @Prop({ required: true, type: String })
  _id: string;

  @Prop({ required: true, type: String })
  eventName: string;

  @Prop({ required: true, type: String, enum: EventCondition })
  eventCondition: EventCondition;

  @Prop({ required: true, type: Boolean })
  isActive: boolean;

  @Prop({ required: true, type: [RewardPartialSchema] })
  rewards: {
    _id: string;
    rewardName: string;
    rewardType: RewardType;
    rewardAmount: number;
  }[];

  @Prop({ required: true, type: String })
  startDate: string;

  @Prop({ required: true, type: String })
  endDate: string;
}

export type EventSchema = HydratedDocument<EventDocument>;
export const EventSchema = SchemaFactory.createForClass(EventDocument);
