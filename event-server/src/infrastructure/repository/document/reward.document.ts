import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { RewardType } from 'src/domain/vo/reward/reward.type';
import { BaseSchema } from '../../../common/schema/base.schema';

@Schema({ timestamps: true })
export class RewardDocument extends BaseSchema {
  @Prop({ required: true, type: String })
  _id: string;

  @Prop({ required: true, type: String })
  rewardName: string;

  @Prop({ required: true, enum: RewardType, type: String })
  rewardType: RewardType;

  @Prop({ required: true, type: Number })
  rewardAmount: number;
}

export type RewardSchema = HydratedDocument<RewardDocument>;
export const RewardSchema = SchemaFactory.createForClass(RewardDocument);
