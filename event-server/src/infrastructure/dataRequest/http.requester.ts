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
  }
}
