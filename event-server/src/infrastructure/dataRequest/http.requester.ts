import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import serverConfig from 'src/common/config/server.config';
import {
  DataRequester,
  UserData,
} from 'src/service/interface/data.requester.interface';

@Injectable()
export class HttpRequester implements DataRequester {
  constructor(
    private readonly httpService: HttpService,
    @Inject(serverConfig.KEY)
    private readonly config: ConfigType<typeof serverConfig>,
  ) {}

  async requestUserData(userId: string): Promise<UserData> {
    try {
      const { data } = await firstValueFrom(
        this.httpService
          .get<{
            data: UserData;
          }>(`${this.config.authServer}/auth/user/${userId}`)
          .pipe(
            catchError((error: AxiosError) => {
              throw error;
            }),
          ),
      );
      return data.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 404) {
          throw new Error('USER_NOT_FOUND');
        }
      }
      throw new Error('INTERNAL_SERVER_ERROR');
    }
  }
}
