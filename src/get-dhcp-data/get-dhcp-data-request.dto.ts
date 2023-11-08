import { IsString } from 'class-validator';

export class GetDHCPDataRequestDto {
  @IsString()
  ipAddress: string;
}
