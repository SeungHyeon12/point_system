import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Reward } from 'src/domain/vo/reward/reward';
import { RewardType } from 'src/domain/vo/reward/reward.type';
import { BaseSchema } from '../../../common/schema/base.schema';
import { BaseSchemaMethod } from 'src/common/schema/base.schema.method.interface';

@Schema({ timestamps: true })
export class RewardDocument
  extends BaseSchema
  implements BaseSchemaMethod<Reward>
{
  @Prop({ required: true, type: String })
  _id: string;

  @Prop({ required: true, type: String })
  rewardName: string;

  @Prop({ required: true, enum: RewardType, type: String })
  rewardType: RewardType;

  @Prop({ required: true, type: Number })
  rewardAmount: number;

  toDomain(): Reward {
    return new Reward({
      id: this._id,
      rewardName: this.rewardName,
      rewardType: this.rewardType,
      rewardAmount: this.rewardAmount,
    });
  }
}

export type RewardSchema = HydratedDocument<
  RewardDocument,
  BaseSchemaMethod<Reward>
>;
export const RewardSchema = SchemaFactory.createForClass(RewardDocument);
