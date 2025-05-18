import { ApiProperty } from '@nestjs/swagger';

export class TokenIntrospectResponseDTO {
  @ApiProperty({
    description: '토큰의 subject (대상 사용자 ID)',
    example: 'user_12345',
  })
  sub: string;

  @ApiProperty({ description: '토큰의 활성 상태 여부', example: true })
  active: boolean;

  @ApiProperty({
    description: '토큰의 만료 시간 (Unix timestamp)',
    example: 1716223456,
  })
  exp: number;

  constructor(args: { sub: string; active: boolean; exp: number }) {
    this.sub = args.sub;
    this.active = args.active;
    this.exp = args.exp;
  }
}
