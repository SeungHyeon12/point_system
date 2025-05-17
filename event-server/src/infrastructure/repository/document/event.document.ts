import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Event } from 'src/domain/event';
import { EventCondition } from 'src/domain/vo/condition/event.condition';
import { RewardSchema } from './reward.document';
import { RewardType } from 'src/domain/vo/reward/reward.type';
import { Reward } from 'src/domain/vo/reward/reward';
import { BaseSchema } from '../../../common/schema/base.schema';
import { BaseSchemaMethod } from 'src/common/schema/base.schema.method.interface';

@Schema({ timestamps: true })
export class EventDocument
  extends BaseSchema
  implements BaseSchemaMethod<Event>
{
  @Prop({ required: true, type: String })
  _id: string;

  @Prop({ required: true, type: String })
  eventName: string;

  @Prop({ required: true, type: String, enum: EventCondition })
  eventCondition: EventCondition;

  @Prop({ required: true, type: Boolean })
  isActive: boolean;

  @Prop({ required: true, type: RewardSchema })
  reward: {
    id: string;
    rewardName: string;
    rewardType: RewardType;
    rewardAmount: number;
  };

  @Prop({ required: true, type: String })
  startDate: string;

  @Prop({ required: true, type: String })
  endDate: string;

  toDomain(): Event {
    return new Event({
      id: this._id,
      eventName: this.eventName,
      eventCondition: this.eventCondition,
      isActive: this.isActive,
      reward: new Reward({
        id: this.reward.id,
        rewardName: this.reward.rewardName,
        rewardType: this.reward.rewardType,
        rewardAmount: this.reward.rewardAmount,
      }),
      startDate: this.startDate,
      endDate: this.endDate,
    });
  }
}

export type EventSchema = HydratedDocument<
  EventDocument,
  BaseSchemaMethod<Event>
>;
export const EventSchema = SchemaFactory.createForClass(EventDocument);
