import { IsOptional, IsString } from 'class-validator';
import { IPhoneNumber } from 'src/responses/phone-number.interface';

export class CancelAbaInstallationRequestDto implements IPhoneNumber {
  @IsString()
  areaCode: string;

  @IsString()
  phoneNumber: string;

  @IsString()
  customerIdentificationDocument: string;

  @IsString()
  @IsOptional()
  installerLogin?: string;
}
