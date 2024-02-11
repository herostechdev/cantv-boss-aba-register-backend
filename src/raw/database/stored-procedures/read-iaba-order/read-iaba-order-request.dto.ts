import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';
import { PhoneNumberDto } from 'src/boss/dtos/phone-number.dto';

export class ReadIABAOrderRequestDto extends PhoneNumberDto {
  @IsBoolean()
  orderIsAtBoss: boolean;

  @IsString()
  ncc: string;

  @IsString()
  orderId: string;

  @IsString()
  customerType: string;

  @IsString()
  orderDate: string;

  @IsString()
  rack: string;

  @IsString()
  position: string;

  @IsInt()
  dslamSlot: number;

  @IsInt()
  port: number;

  @IsString()
  ad: string;

  @IsString()
  adPair: string;

  @IsString()
  @IsOptional()
  office?: string;

  @IsString()
  @IsOptional()
  createdBy?: string;

  @IsString()
  provider: string;

  @IsString()
  room: string;

  @IsInt()
  @IsOptional()
  recursive?: number;

  @IsString()
  @IsOptional()
  system?: string;

  @IsString()
  centralPortId: string;

  @IsString()
  @IsOptional()
  executionDate?: string;

  @IsInt()
  isAutoInstallation: number;
}
