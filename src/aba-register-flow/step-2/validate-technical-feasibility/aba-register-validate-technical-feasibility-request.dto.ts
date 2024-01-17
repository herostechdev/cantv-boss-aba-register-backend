import { IsBoolean, IsIP, IsInt, IsOptional, IsString } from 'class-validator';
import { PhoneNumberDto } from 'src/boss/dtos/phone-number.dto';

export class AbaRegisterValidateTechnicalFeasibilityRequestDto extends PhoneNumberDto {
  @IsIP(4, { message: 'La IP es inválida' })
  ipAddress: string;

  @IsString()
  registerDate: string;

  @IsString()
  @IsOptional()
  loginInstall?: string;

  @IsInt()
  orderId: number; // Origen del parametro orderId (CTVIDSRVORD)  >> CORRESPONDE A LA ORDEN DE SERVICIO SUMINISTRADA POR EL CLIENTE EN LA VENTANA DONDE SE SOLICITA EL NUMERO DE TELEFONO

  @IsBoolean()
  orderIsAtBoss: boolean;

  @IsString()
  @IsOptional()
  lineType?: string; // ICustomerByPhoneNumberResponse.TIPO_LINEA

  @IsBoolean()
  isAutoInstallation: boolean;
}
