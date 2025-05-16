import { Module } from '@nestjs/common';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { EventController } from './controller/event.controller';
import { EventService } from './service/event.service';

@Module({
  imports: [InfrastructureModule],
  controllers: [EventController],
  providers: [EventService],
})
export class AppModule {}
