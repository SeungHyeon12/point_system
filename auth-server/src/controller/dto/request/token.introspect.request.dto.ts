import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

// 우선적으로 token introspect 에서 basic token으로 clientID 는 고려하지 않는다.
export class TokenIntrospectRequestDTO {
  @ApiProperty({
    description: '검증할 토큰 문자열',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  @IsString()
  token: string;
}
