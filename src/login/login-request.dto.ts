import { IsString, IsStrongPassword } from 'class-validator';

export class LoginRequestDto {
  @IsString()
  username: string;

  @IsStrongPassword()
  password: string;
}
