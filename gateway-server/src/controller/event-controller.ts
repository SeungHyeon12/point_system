import {
  Body,
  Controller,
  Get,
  Headers,
  Inject,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import serverConfig from 'src/common/config/server.config';
import { CustomAuthGuard } from 'src/common/guards/custom.auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/roles/role.decorator';
import { UserRole } from 'src/common/roles/roles';
import { GatewayService } from 'src/service/gateway.proxy.service';

@Controller('gw/event')
export class EventController {
  constructor(
    @Inject(serverConfig.KEY)
    private readonly config: ConfigType<typeof serverConfig>,
    private readonly gatewayService: GatewayService,
  ) {}

  @Post()
  @UseGuards(CustomAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.OPERATOR)
  async createEvent(@Body() createEventRequestDTO: Record<string, any>) {
    const data: Record<string, any> = await this.gatewayService.proxy({
      method: 'POST',
      url: `${this.config.EVENT_SERVER_URI}/events`,
      options: {
        body: createEventRequestDTO,
      },
    });
    return data;
  }

  @Get()
  async getEvents(
    @Query('limit') limit: number,
    @Query('cursor') cursor?: string,
  ) {
    const data: Record<string, any> = await this.gatewayService.proxy({
      method: 'GET',
      url: `${this.config.EVENT_SERVER_URI}/events`,
      options: {
        params: {
          cursor,
          limit,
        },
      },
    });
    return data;
  }

  @Post('rewards')
  @UseGuards(CustomAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.OPERATOR)
  async createReward(@Body() body: Record<string, any>) {
    const data: Record<string, any> = await this.gatewayService.proxy({
      method: 'POST',
      url: `${this.config.EVENT_SERVER_URI}/rewards`,
      options: { body },
    });
    return data;
  }

  @Get('rewards')
  @UseGuards(CustomAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.OPERATOR)
  async getRewards() {
    const data: Record<string, any> = await this.gatewayService.proxy({
      method: 'GET',
      url: `${this.config.EVENT_SERVER_URI}/rewards`,
      options: {},
    });
    return data;
  }

  @Get('rewards:rewardId')
  @UseGuards(CustomAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.OPERATOR)
  async getReward(@Param('rewardId') rewardId: string) {
    const data: Record<string, any> = await this.gatewayService.proxy({
      method: 'GET',
      url: `${this.config.EVENT_SERVER_URI}/rewards/${rewardId}`,
      options: {},
    });
    return data;
  }

  @Post('reward-requests')
  @UseGuards(CustomAuthGuard, RolesGuard)
  @Roles(UserRole.USER)
  async requestReward(@Body() body: Record<string, any>) {
    const data: Record<string, any> = await this.gatewayService.proxy({
      method: 'POST',
      url: `${this.config.EVENT_SERVER_URI}/rewards/reward-requests`,
      options: { body },
    });
    return data;
  }

  @Post('reward-requests/review')
  @UseGuards(CustomAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.OPERATOR)
  async reviewRequest(@Body() body: Record<string, any>) {
    const data: Record<string, any> = await this.gatewayService.proxy({
      method: 'POST',
      url: `${this.config.EVENT_SERVER_URI}/rewards/reward-requests/review`,
      options: { body },
    });
    return data;
  }

  @Get('reward-requests')
  @UseGuards(CustomAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.OPERATOR, UserRole.AUDITOR)
  async getRewardRequests() {
    const data: Record<string, any> = await this.gatewayService.proxy({
      method: 'GET',
      url: `${this.config.EVENT_SERVER_URI}/rewards/reward-requests`,
      options: {},
    });
    return data;
  }

  @Get('reward-requests/users/:userId')
  @UseGuards(CustomAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.OPERATOR, UserRole.AUDITOR)
  async getUserRequests(@Param('userId') userId: string) {
    const data: Record<string, any> = await this.gatewayService.proxy({
      method: 'GET',
      url: `${this.config.EVENT_SERVER_URI}/rewards/reward-requests/users/${userId}`,
      options: {},
    });
    return data;
  }

  @Get(':eventId')
  async getEvent(@Param('eventId') eventId: string) {
    const data: Record<string, any> = await this.gatewayService.proxy({
      method: 'GET',
      url: `${this.config.EVENT_SERVER_URI}/events/${eventId}`,
      options: {},
    });
    return data;
  }
}
