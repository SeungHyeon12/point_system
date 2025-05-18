import { ApiProperty } from '@nestjs/swagger';

export class GetUserInfoResponseDTO {
  @ApiProperty({ description: '사용자 이메일', example: 'user@example.com' })
  email: string;

  @ApiProperty({ description: '사용자 역할', example: 'admin' })
  userRole: string;

  @ApiProperty({ description: '추천인 ID', example: 'abc123', required: false })
  recommenderId?: string;

  @ApiProperty({
    description: '마지막 로그인 날짜 (ISO 8601 형식)',
    example: '2024-05-17T08:30:00Z',
    required: false,
  })
  lastLoginDate?: string;

  @ApiProperty({ description: '로그인 일수', example: 42 })
  loginDays: number;

  @ApiProperty({ description: '추천한 사용자 수', example: 5 })
  recommenderCount: number;

  constructor(args: {
    email: string;
    userRole: string;
    recommenderId?: string;
    lastLoginDate?: string;
    loginDays: number;
    recommenderCount: number;
  }) {
    this.email = args.email;
    this.userRole = args.userRole;
    this.recommenderId = args.recommenderId;
    this.lastLoginDate = args.lastLoginDate;
    this.loginDays = args.loginDays;
    this.recommenderCount = args.recommenderCount;
  }
}
