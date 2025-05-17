import { IsEmail, IsOptional, IsString } from 'class-validator';

export class SignUpRequestDTO {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsEmail()
  recommenderEmail?: string;
}
