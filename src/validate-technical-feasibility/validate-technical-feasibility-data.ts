import { ICheckIpResponse } from './check-ip/check-ip-response.interface';
import { IDeleteOrderResponse } from './delete-order/delete-order-response.interface';
import { IGetABADataFromRequestsResponse } from './get-aba-data-from-requests/get-aba-data-from-requests-response.interface';
import { IGetABADataResponse } from './get-aba-data/get-aba-data-response.interface';
import { IGetAndRegisterQualifOfServiceResponse } from './get-and-register-qualif-of-service/get-and-register-qualif-of-service-response.interface';
import { IGetDataFromDSLAMPortIdResponse } from './get-data-from-dslam-port-id/get-data-from-dslam-port-id-response.interface';
import { IGetDataFromRequestsResponse } from './get-data-from-requests/get-data-from-requests-response.interface';
import { IGetDownstreamFromPlanResponse } from './get-downstream-from-plan/get-downstream-from-plan-response.interface';
import { IGetDSLCentralCoIdByDSLAMPortIdResponse } from './get-dsl-central-co-id-by-dslam-port-id/get-dsl-central-co-id-by-dslam-port-id-response.interface';
import { IGetPortIdFromIpResponse } from './get-port-id-from-ip/get-port-id-from-ip-response.interface';
import { IIsPrepaidVoiceLineResponse } from './is-prepaid-voice-line/is-prepaid-voice-line-response.interface';
import { IIsOccupiedPortResponse } from './Is-occupied-port/is-occupied-port-response.interface';
import { IIsValidIpAddressResponse } from './is-valid-ip-address/is-valid-ip-address-response.interface';
import { IReadIABAOrderResponse } from './read-iaba-order/read-iaba-order-response.interface';
import { IVerifiyContractByPhoneResponse } from './verify-contract-by-phone/verify-contract-by-phone-response.interface';
import { ValidateTechnicalFeasibilityRequestDto } from './validate-technical-feasibility-request.dto';

export class ValidateTechnicalFeasibilityData {
  requestDto: ValidateTechnicalFeasibilityRequestDto;
  insertDslAbaRegistersResponse: number;
  isPrepaidVoiceLine: IIsPrepaidVoiceLineResponse;
  getAndRegisterQualifOfServiceResponse: IGetAndRegisterQualifOfServiceResponse;
  verifyContractByPhoneResponse: IVerifiyContractByPhoneResponse;
  getDataFromRequestsResponse: IGetDataFromRequestsResponse;
  // getInfoFromABARequestsResponse: IGetInfoFromABARequestsResponse;
  getDownstreamFromPlanResponse: IGetDownstreamFromPlanResponse;
  getABADataFromRequestsResponse: IGetABADataFromRequestsResponse;
  isValidIpAddressResponse: IIsValidIpAddressResponse;
  getPortIdFromIpResponse: IGetPortIdFromIpResponse;
  // TODO: DETERMINAR EL TIPO DE LA RESPUESTA DEL RECURSO API: queryDHCP
  queryDHCPResponse: any;
  getValidVPIResponse: string;
  // TODO: DETERMINAR EL TIPO DE LA RESPUESTA DEL SP: getPortId
  getPortIdResponse: any;
  isOccupiedPortResponse: IIsOccupiedPortResponse;
  // DETERMINAR ESTRUCTURA DE RESPUESTA DEL SERVICIO PIC QUE SUSTITUYE LA DLL snacom.dll
  snacomDllResponse: any;
  getABADataResponse: IGetABADataResponse;
  checkIpResponse: ICheckIpResponse;
  getDataFromDslamPortIdResponse: IGetDataFromDSLAMPortIdResponse;
  deleteOrderResponse: IDeleteOrderResponse;
  readIABAOrderResponse: IReadIABAOrderResponse;
  getDSLCentralCoIdByDSLAMPortIdResponse: IGetDSLCentralCoIdByDSLAMPortIdResponse;
}
