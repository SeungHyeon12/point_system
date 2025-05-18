import { ApiProperty } from '@nestjs/swagger';

export class RefreshAccessTokenResponseDTO {
  @ApiProperty({
    description: '새로 발급된 액세스 토큰',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  accessToken: string;

  constructor(args: { accessToken: string }) {
    this.accessToken = args.accessToken;
  }
}
