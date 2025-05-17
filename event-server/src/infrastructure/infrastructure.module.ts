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

@Module({
  imports: [
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
  ],
  exports: [
    'EVENT_REPOSITORY',
    'REWARD_REPOSITORY',
    'USER_REWARD_RESULT_REPOSITORY',
  ],
})
export class InfrastructureModule {}
