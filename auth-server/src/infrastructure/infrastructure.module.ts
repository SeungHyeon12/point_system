import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import mongodbConfig from 'src/common/config/mongodb.config';
import {
  UserDocument,
  UserSchema,
} from 'src/infrastructure/repository/document/user.document';
import { UserRepostiory } from 'src/infrastructure/repository/user.repository';

@Module({
  imports: [
    ConfigModule.forFeature(mongodbConfig),
    MongooseModule.forFeature([
      {
        name: UserDocument.name,
        schema: UserSchema,
      },
    ]),
  ],
  providers: [
    {
      provide: 'USER_REPOSITORY',
      useClass: UserRepostiory,
    },
  ],
  exports: ['USER_REPOSITORY'],
})
export class InfrastructureModule {}
