import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { GatewayService } from './service/gateway.proxy.service';
import { ConfigModule } from '@nestjs/config';
import serverConfig from './common/config/server.config';
import { EventController } from './controller/event-controller';
import { AuthController } from './controller/auth-controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [serverConfig],
    }),
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
      }),
    }),
  ],
  controllers: [EventController, AuthController],
  providers: [GatewayService],
})
export class AppModule {}
