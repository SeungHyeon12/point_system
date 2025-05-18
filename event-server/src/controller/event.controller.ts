import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { EventService } from 'src/service/event.service';
import { CreateEventRequestDTO } from './dto/request/create.event.request.dto';
import { GetEventsResponseDTO } from './dto/response/get.events.response.dto';
import { GetEventResponseDto } from './dto/response/get.event.response.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiCommonOkResponse } from 'src/common/response/common.response.decorator';
import { CommonResponseDto } from 'src/common/response/common.response.dto';

@ApiTags('Events')
@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  @ApiOperation({
    summary: '이벤트 생성',
  })
  async createEvent(@Body() createEventRequestDTO: CreateEventRequestDTO) {
    await this.eventService.createEvent({
      ...createEventRequestDTO,
    });
    return new CommonResponseDto<null>({ data: null });
  }

  @Get()
  @ApiOperation({
    summary: '이벤트 목록 조회',
  })
  @ApiCommonOkResponse(GetEventsResponseDTO)
  async getEvents() {
    const data = await this.eventService.getAllEvents();
    const response = new GetEventsResponseDTO(data);
    return new CommonResponseDto<GetEventsResponseDTO>({
      data: response,
    });
  }

  @Get(':eventId')
  @ApiOperation({
    summary: '이벤트 개별 조회',
  })
  @ApiCommonOkResponse(GetEventResponseDto)
  async getEvent(@Param('eventId') eventId: string) {
    const data = await this.eventService.getEventById({ id: eventId });
    const response = new GetEventResponseDto(data);
    return new CommonResponseDto<GetEventResponseDto>({
      data: response,
    });
  }
}
