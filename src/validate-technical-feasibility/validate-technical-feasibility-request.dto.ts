import { IsBoolean, IsIP, IsInt, IsString } from 'class-validator';
import { IPhoneNumber } from 'src/responses/phone-number.interface';

export class ValidateTechnicalFeasibilityRequestDto implements IPhoneNumber {
  @IsIP(4, { message: 'La IP es inválida' })
  ipAddress: string;

  @IsString()
  areaCode: string;

  @IsString()
  phoneNumber: string;

  @IsString()
  registerDate: string;

  @IsString()
  registerStatus: string;

  @IsString()
  loginInstall: string;

  @IsInt()
  orderId: number; // Origen del parametro orderId (CTVIDSRVORD)  >> CORRESPONDE A LA ORDEN DE SERVICIO SUMINISTRADA POR EL CLIENTE EN LA VENTANA DONDE SE SOLICITA EL NUMERO DE TELEFONO

  @IsInt()
  dslamPortId: number; // Origen del parámetro l_dslamportid   >>  GetPortIdFromIp.o_dslamportid   O GetPortId.t_portid

  @IsString()
  nsp: string;

  @IsInt()
  vpi: number;

  @IsInt()
  vci: number;

  @IsBoolean()
  isAutoInstallation: boolean;
}
