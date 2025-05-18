import { ApiProperty } from '@nestjs/swagger';
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

  @ApiProperty({
    description: '사용자 admin role',
    example: 'OPERATOR',
    enum: ['OPERATOR', 'AUDITOR', 'ADMIN'],
  })
  @IsString()
  @IsEnum(['OPERATOR', 'AUDITOR', 'ADMIN'])
  role: 'OPERATOR' | 'AUDITOR' | 'ADMIN';
}
