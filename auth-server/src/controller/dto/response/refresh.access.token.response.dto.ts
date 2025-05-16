import { IsString } from 'class-validator';

export class RefreshAccessTokenResponseDTO {
  @IsString()
  accessToken: string;

  constructor(args: { accessToken: string }) {
    this.accessToken = args.accessToken;
  }
}
