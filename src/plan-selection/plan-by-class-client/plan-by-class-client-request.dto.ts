import { IsInt, IsString } from 'class-validator';

export class PlanByClassClientRequestDto {
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

  @IsString()
  areaCode: string;

  @IsString()
  phoneNumber: string;
}
