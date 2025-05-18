import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, catchError, tap } from 'rxjs';
import { createUniqueId } from '../uitls/createUniqueId.function';

export interface RequestLoggerRepository {
  create(args: {
    id: string;
    userId: string;
    eventId: any;
    requestType: 'REQUEST' | 'RESPONSE';
    status: 'STARTED' | 'COMPLETED' | 'FAILED';
    errorMessage?: string;
    traceId: string;
  }): Promise<void>;
}

@Injectable()
export class RequestRewardLogInterceptor implements NestInterceptor {
  private readonly logger = new Logger(RequestRewardLogInterceptor.name);
  constructor(
    @Inject('USER_REWARD_RESULT_LOG_REPOSITORY')
    private readonly logRepository: RequestLoggerRepository,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest<Request>();
    const body = req.body as unknown as { userId: string; eventId: string };
    const traceId = createUniqueId();
    this.logRepository
      .create({
        id: createUniqueId(),
        userId: body.userId,
        eventId: body.eventId,
        requestType: 'REQUEST',
        status: 'STARTED',
        traceId,
      })
      .catch((err) => {
        this.logger.error('Request log error', err);
      });

    return next.handle().pipe(
      tap(() => {
        this.logRepository
          .create({
            id: createUniqueId(),
            userId: body.userId,
            eventId: body.eventId,
            requestType: 'RESPONSE',
            status: 'COMPLETED',
            traceId,
          })
          .catch((err) => {
            this.logger.error('Response log error', err);
          });
      }),
      catchError((err) => {
        // 실패 로그 저장
        this.logRepository
          .create({
            id: createUniqueId(),
            userId: body.userId,
            eventId: body.eventId,
            requestType: 'RESPONSE',
            status: 'FAILED',
            errorMessage: JSON.stringify(err),
            traceId,
          })
          .catch((err) => {
            this.logger.error('Response log error', err);
          });
        throw err;
      }),
    );
  }
}
