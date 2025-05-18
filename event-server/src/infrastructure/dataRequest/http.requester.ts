import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import {
  DataRequester,
  UserData,
} from 'src/service/interface/data.requester.interface';

@Injectable()
export class HttpRequester implements DataRequester {
  constructor(private readonly httpService: HttpService) {}

  async requestUserData(userId: string): Promise<UserData> {
    try {
      const { data } = await firstValueFrom(
        this.httpService
          .get<UserData>(`http://localhost:3000/auth/user/${userId}`)
          .pipe(
            catchError((error: AxiosError) => {
              throw error;
            }),
          ),
      );
      return data;
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
