import { IsEmail, IsString } from 'class-validator';

export class SignUpRequestDTO {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
