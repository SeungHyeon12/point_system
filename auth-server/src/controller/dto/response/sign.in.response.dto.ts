import { IsString } from 'class-validator';

export class SignInResponseDto {
  @IsString()
  accessToken: string;

  @IsString()
  refreshToken: string;

  constructor(args: { refreshToken: string; accessToken: string }) {
    this.accessToken = args.accessToken;
    this.refreshToken = args.refreshToken;
  }
}
