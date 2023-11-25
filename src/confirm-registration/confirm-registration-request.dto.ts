import { IsIP, IsInt, IsOptional, IsString } from 'class-validator';
import { IPhoneNumber } from 'src/responses/phone-number.interface';

export class ConfirmRegistrationRequestDto implements IPhoneNumber {
  @IsIP(4, { message: 'La IP es inválida' })
  ipAddress: string;

  @IsString()
  areaCode: string;

  @IsString()
  phoneNumber: string;

  @IsString()
  customerClassName: string; // NATURALES o RIF

  @IsString()
  customerIdentificationDocument: string; // Cédula o RIF

  @IsString()
  customerAddress1: string; // GetDataFromRequests.address1

  @IsString()
  customerAddress2: string; // GetDataFromRequests.address2

  @IsString()
  customerCity: string; // GetDataFromRequests.city

  @IsString()
  customerState: string; // GetDataFromRequests.state

  /**
   * Ejemplo persona natural:
   * CEDULA_IDENTIDAD:13456789,PRIMERA_LETRA_CEDULA:V,CIUDAD:CARACAS,ESTADO:DISTRITO CAPITAL,FECHA_NACIMIENTO:13/10/1990,PRIMER_NOMBRE:JESUS,PRIMER_APELLIDO:PEREZ
   *
   * Ejemplo persona jurídica:
   * NUMERO_RIF:13456789,PRIMERA_LETRA_RIF:J,CIUDAD:CARACAS,ESTADO:DISTRITO CAPITAL,RAZON_SOCIAL:CANTV SERVICIOS
   */
  @IsString()
  attributeValues: string;

  @IsString()
  technicalPlanName: string; // PlansByClassClient.O_PLANDESIRED

  @IsInt()
  @IsOptional()
  orderId?: number;

  @IsString()
  @IsOptional()
  installerLogin?: string;

  @IsString()
  @IsOptional()
  contractLogin?: string;
}
