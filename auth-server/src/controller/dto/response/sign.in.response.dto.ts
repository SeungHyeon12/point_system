export class SignInResponseDto {
  accessToken: string;
  refreshToken: string;

  constructor(args: { refreshToken: string; accessToken: string }) {
    this.accessToken = args.accessToken;
    this.refreshToken = args.refreshToken;
  }
}
