import { IsString } from 'class-validator';

export class SignUpParams {
  @IsString()
  public username: string;

  @IsString()
  public password: string;
}

export class LoginParams {
  @IsString()
  public username: string;

  @IsString()
  public password: string;
}
