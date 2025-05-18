// gateway.service.ts
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { AxiosResponse, Method } from 'axios';

@Injectable()
export class GatewayService {
  constructor(private readonly httpService: HttpService) {}

  async proxy<T = any>(args: {
    method: Method;
    url: string;
    options: {
      body?: Record<string, any>;
      headers?: {
        [header: string]: string;
      };
    };
  }): Promise<T> {
    const response: AxiosResponse<T> = await firstValueFrom(
      this.httpService.request<T>({
        method: args.method,
        url: args.url,
        data: args.options?.body,
        headers: args.options?.headers,
      }),
    );
    return response.data;
  }
}
