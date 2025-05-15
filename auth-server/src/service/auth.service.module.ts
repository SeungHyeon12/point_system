import { Module } from '@nestjs/common';
import { AuthService } from 'src/service/auth.service';
import { ConfigModule } from '@nestjs/config';
import mongodbConfig from 'src/common/config/mongodb.config';
import { AuthController } from 'src/controller/auth.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [mongodbConfig],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AUTH {}
