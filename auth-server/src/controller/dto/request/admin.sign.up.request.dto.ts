import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsString } from 'class-validator';

export class AdminSignUpRequestDTO {
  @ApiProperty({
    description: '사용자 이메일 주소',
    example: 'newuser@example.com',
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: '사용자 비밀번호',
    example: 'StrongPassword!123',
  })
  @IsString()
  password: string;

  @ApiPropertyOptional({
    description: '추천인 이메일 주소 (선택 사항)',
    example: 'OPERATOR',
    enum: ['OPERATOR', 'AUDITOR', 'ADMIN'],
  })
  @IsEnum(['OPERATOR', 'AUDITOR', 'ADMIN'])
  role: 'OPERATOR' | 'AUDITOR' | 'ADMIN';
}
