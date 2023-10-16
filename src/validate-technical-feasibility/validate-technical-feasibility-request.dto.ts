import { IsDate, IsString } from 'class-validator';

export class ValidateTechnicalFeasibilityRequestDto {
  @IsString()
  areaCode: string;

  @IsString()
  phoneNumber: string;

  @IsDate()
  registerDate: Date;

  @IsString()
  registerStatus: string;

  @IsString()
  loginInstall: string;
}
