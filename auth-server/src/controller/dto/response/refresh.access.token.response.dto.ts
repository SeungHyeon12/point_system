export class RefreshAccessTokenResponseDTO {
  accessToken: string;

  constructor(args: { accessToken: string }) {
    this.accessToken = args.accessToken;
  }
}
