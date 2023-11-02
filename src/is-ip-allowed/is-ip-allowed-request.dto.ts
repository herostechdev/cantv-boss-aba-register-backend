import { IsIP } from 'class-validator';

export class IsIPAllowedRequestDto {
  @IsIP(4, { message: 'La IP es inválida' })
  ipAddress: string;
}
