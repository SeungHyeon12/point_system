import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import mongodbConfig from 'src/common/config/mongodb.config';
import { UserRepostiory } from 'src/infrastructure/repository/user.repository';

@Module({
  imports: [ConfigModule.forFeature(mongodbConfig)],
  providers: [
    {
      provide: 'USER_REPOSITORY',
      useClass: UserRepostiory,
    },
  ],
  exports: ['USER_REPOSITORY'],
})
export class InfrastructureModule {}
