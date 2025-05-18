import { ApiProperty } from '@nestjs/swagger';

export class SignInResponseDto {
  @ApiProperty({
    description: '발급된 액세스 토큰',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  accessToken: string;

  @ApiProperty({
    description: '발급된 리프레시 토큰',
    example: 'dGhpc2lzYXJlZnJlc2h0b2tlbg==',
  })
  refreshToken: string;

  constructor(args: { refreshToken: string; accessToken: string }) {
    this.accessToken = args.accessToken;
    this.refreshToken = args.refreshToken;
  }
}
