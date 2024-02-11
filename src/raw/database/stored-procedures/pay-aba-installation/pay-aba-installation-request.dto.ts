import { IsOptional, IsString } from 'class-validator';
import { PhoneNumberDto } from 'src/boss/dtos/phone-number.dto';

export class PayAbaInstallationRequestDto extends PhoneNumberDto {
  @IsString()
  customerIdentificationDocument: string;

  @IsString()
  @IsOptional()
  installerLogin?: string;
}
