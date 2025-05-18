import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import mongodbConfig from 'src/common/config/mongodb.config';
import { MongooseModule } from '@nestjs/mongoose';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';
import { EventController } from './controller/event.controller';
import { EventService } from './service/event.service';
import { EventConditionHelper } from './service/event.condition.helper';
import { RewardController } from './controller/reward.controller';

@Module({
  imports: [
    InfrastructureModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [mongodbConfig],
    }),
    MongooseModule.forRootAsync({
      inject: [mongodbConfig.KEY],
      useFactory: (config: ConfigType<typeof mongodbConfig>) => ({
        uri: config.mongoURI,
      }),
    }),
  ],
  controllers: [EventController, RewardController],
  providers: [EventService, EventConditionHelper],
})
export class AppModule {}
