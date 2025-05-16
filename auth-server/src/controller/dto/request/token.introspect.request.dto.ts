import { IsString } from 'class-validator';

//우선적으로 token introspect 에서 basic token으로 clientID 는 고려하지 않는다.
export class TokenIntrospectRequestDTO {
  @IsString()
  token: string;
}
