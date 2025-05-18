import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import mongodbConfig from 'src/common/config/mongodb.config';
import {
  EventDocument,
  EventSchema,
} from './repository/document/event.document';
import {
  RewardDocument,
  RewardSchema,
} from './repository/document/reward.document';
import {
  UserRewardResultDocument,
  UserRewardResultSchema,
} from './repository/document/user.reward.result.document';
import { EventRepository } from './repository/event.repository';
import { RewardRepository } from './repository/reward.repository';
import { UserRewardResultRepository } from './repository/user.reward.result.repository';
import { HttpModule } from '@nestjs/axios';
import { HttpRequester } from './dataRequest/http.requester';
import {
  RequestRewardLogDocument,
  RequestRewardLogSchema,
} from './repository/document/request.reward.log';
import { UserRewardResultLogRepository } from './repository/user.reward.result.log.repository';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
      }),
    }),
    ConfigModule.forFeature(mongodbConfig),
    MongooseModule.forFeature([
      {
        name: EventDocument.name,
        schema: EventSchema,
      },
      {
        name: RewardDocument.name,
        schema: RewardSchema,
      },
      {
        name: UserRewardResultDocument.name,
        schema: UserRewardResultSchema,
      },
      {
        name: RequestRewardLogDocument.name,
        schema: RequestRewardLogSchema,
      },
    ]),
  ],
  providers: [
    {
      provide: 'EVENT_REPOSITORY',
      useClass: EventRepository,
    },
    {
      provide: 'REWARD_REPOSITORY',
      useClass: RewardRepository,
    },
    {
      provide: 'USER_REWARD_RESULT_REPOSITORY',
      useClass: UserRewardResultRepository,
    },
    {
      provide: 'DATA_REQUESTER',
      useClass: HttpRequester,
    },
    {
      provide: 'USER_REWARD_RESULT_LOG_REPOSITORY',
      useClass: UserRewardResultLogRepository,
    },
  ],
  exports: [
    'EVENT_REPOSITORY',
    'REWARD_REPOSITORY',
    'USER_REWARD_RESULT_REPOSITORY',
    'DATA_REQUESTER',
    'USER_REWARD_RESULT_LOG_REPOSITORY',
  ],
})
export class InfrastructureModule {}
