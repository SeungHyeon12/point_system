import {
  IsArray,
  IsBoolean,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import {
  ScopeValues,
  UserRoleScopeHelper,
} from 'src/domain/vo/user.role.scope.helper';

const VALID_SOCPES = Array.from(
  new Set(Object.values(UserRoleScopeHelper.scope)),
);

export class TokenIntrospectResponseDTO {
  @IsString()
  sub: string;

  @IsBoolean()
  active: boolean;

  @IsOptional()
  @IsArray()
  @IsIn(VALID_SOCPES, { each: true })
  scope?: ScopeValues[];

  @IsNumber()
  exp: number;

  constructor(args: {
    sub: string;
    active: boolean;
    scope?: ScopeValues[];
    exp: number;
  }) {
    this.sub = args.sub;
    this.active = args.active;
    this.scope = args.scope;
    this.exp = args.exp;
  }
}
