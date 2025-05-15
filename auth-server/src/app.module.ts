import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { AuthService } from 'src/service/auth.service';
import { ConfigModule, ConfigType } from '@nestjs/config';
import mongodbConfig from 'src/common/config/mongodb.config';
import { MongooseModule } from '@nestjs/mongoose';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';
import authConfig from 'src/common/config/auth.config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    InfrastructureModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [mongodbConfig, authConfig],
    }),
    MongooseModule.forRootAsync({
      inject: [mongodbConfig.KEY],
      useFactory: (config: ConfigType<typeof mongodbConfig>) => ({
        uri: config.mongoURI,
      }),
    }),
    JwtModule.registerAsync({
      inject: [authConfig.KEY],
      useFactory: (config: ConfigType<typeof authConfig>) => ({
        secret: config.JWT_SECRET,
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AppModule {}
