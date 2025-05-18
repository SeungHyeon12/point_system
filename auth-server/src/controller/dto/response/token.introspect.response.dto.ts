export class TokenIntrospectResponseDTO {
  sub: string;
  active: boolean;
  exp: number;

  constructor(args: { sub: string; active: boolean; exp: number }) {
    this.sub = args.sub;
    this.active = args.active;
    this.exp = args.exp;
  }
}
