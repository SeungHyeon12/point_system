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
  providers: [],
  exports: [],
})
export class InfrastructureModule {}
