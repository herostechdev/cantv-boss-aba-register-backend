import { IsIP } from 'class-validator';

export class CheckIpRequestDto {
  @IsIP(4, { message: 'La IP es inválida' })
  ip: string;
}
