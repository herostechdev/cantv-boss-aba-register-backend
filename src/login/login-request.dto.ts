import { IsString } from 'class-validator';

export class LoginRequestDto {
  @IsString()
  userlogin: string;

  @IsString()
  password: string;
}
