import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  RequestRewardLogDocument,
  RequestRewardLogSchema,
} from './document/request.reward.log';
import { Model } from 'mongoose';
import { RequestLoggerRepository } from 'src/common/interceptor/request.reward.log.interceptor';

@Injectable()
export class UserRewardResultLogRepository implements RequestLoggerRepository {
  constructor(
    @InjectModel(RequestRewardLogDocument.name)
    private readonly userRewardResultModel: Model<RequestRewardLogSchema>,
  ) {}

  async create(args: {
    id: string;
    userId: string;
    eventId: any;
    requestType: 'REQUEST' | 'RESPONSE';
    status: 'STARTED' | 'COMPLETED' | 'FAILED';
    errorMessage?: string;
  }): Promise<void> {
    await this.userRewardResultModel.create({ ...args, _id: args.id });
  }
}
