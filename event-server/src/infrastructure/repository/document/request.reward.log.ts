import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true, collection: 'request_reward_logs' })
export class RequestRewardLogDocument {
  @Prop({ required: true, type: String })
  _id: string;

  @Prop({ type: String })
  userId: string;

  @Prop({ type: String })
  eventId: any;

  @Prop({ required: true, type: String, enum: ['REQUEST', 'RESPONSE'] })
  requestType: 'REQUEST' | 'RESPONSE';

  @Prop({ requried: false, enum: ['STARTED', 'COMPLETED', 'FAILED'] })
  status?: 'STARTED' | 'COMPLETED' | 'FAILED';

  @Prop()
  errorMessage?: string;

  @Prop({ required: true, type: String })
  traceId: string;

  createdAt: string;
}

export type RequestRewardLogSchema = HydratedDocument<RequestRewardLogDocument>;
export const RequestRewardLogSchema = SchemaFactory.createForClass(
  RequestRewardLogDocument,
);
