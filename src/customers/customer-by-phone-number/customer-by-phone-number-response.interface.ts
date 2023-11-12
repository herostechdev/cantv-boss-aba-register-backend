import { ICRMCommonResponse } from '../crm-common-response.interface';

export interface ICustomerByPhoneNumberResponse extends ICRMCommonResponse {
  DIRECCION_COBRO?: string;
  CONDICION_NUMERO_PRIVADO?: string;
  ZONA_POSTAL?: string;
  IDENTIFICADOR_LLAMADAS?: string;
  NOMBRE_CLIENTE?: string;
  UNIDAD_NEGOCIOS?: string;
  SERVICIO_ABA?: string;
  INTENER_EQUIPADO?: string;
  CODERROR?: string;
  DESCERROR?: string;
  OPERADOR_LDI?: string;
  OPERADOR_LDN?: string;
  CEDULA_RIF?: string;
  TIPO_LINEA?: string;
  BLOQUEO?: string;
  MODALIDAD_LINEA?: string;
  CENTRAL?: string;
  PLAN_TARIFARIO?: string;
  BLOQUEO_SELECTIVO?: string;
  RUTA_COBRO?: string;
  OPERADOR_LOCAL?: string;
  CUENTA_CLIENTE?: string;
  CORREO_VOZ?: string;
  TELEAMIGO?: string;
  TARIFA?: string;
}
