import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class TokenIntrospectResponseDTO {
  @IsString()
  sub: string;

  @IsBoolean()
  active: boolean;

  @IsNumber()
  exp: number;

  constructor(args: { sub: string; active: boolean; exp: number }) {
    this.sub = args.sub;
    this.active = args.active;
    this.exp = args.exp;
  }
}
