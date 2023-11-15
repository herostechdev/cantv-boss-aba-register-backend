import { IsInt, IsString } from 'class-validator';
import { IPhoneNumber } from 'src/responses/phone-number.interface';

export class PlanByClassClientRequestDto implements IPhoneNumber {
  @IsString()
  areaCode: string;

  @IsString()
  phoneNumber: string;

  @IsString()
  customerClassName: string;

  @IsInt()
  dslamPortId: number;

  @IsInt()
  wsContract: number;

  @IsString()
  ws3Contract: string;

  @IsString()
  loginDialup: string;

  @IsString()
  sampling: string;

  @IsString()
  uneteAlMega: string;

  @IsString()
  specialCase: string;

  @IsString()
  internetEquipado: string;

  @IsString()
  loginInstalador: string;
}
