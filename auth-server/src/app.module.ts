import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { AuthService } from 'src/service/auth.service';
import { ConfigModule, ConfigType } from '@nestjs/config';
import mongodbConfig from 'src/common/config/mongodb.config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
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
  controllers: [AuthController],
  providers: [AuthService],
})
export class AppModule {}
