import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // error 가 나더라도 항상 코드는 200
    const status = HttpStatus.OK;

    let message: string | object;
    if (exception instanceof HttpException) {
      const response = exception.getResponse();
      message = typeof response === 'string' ? { message: response } : response;
    } else {
      message = { message: 'Internal server error' };
    }

    response.status(status).json({
      result: 'falied',
      message,
    });
  }
}
