import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class SignInRequestDTO {
  @ApiProperty({
    description: '사용자 이메일 주소',
    example: 'user@example.com',
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: '사용자 비밀번호',
    example: 'securePassword123!',
  })
  @IsString()
  password: string;
}
