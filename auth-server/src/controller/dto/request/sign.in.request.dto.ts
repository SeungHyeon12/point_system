import { IsEmail, IsString } from 'class-validator';

export class SignInRequestDTO {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
