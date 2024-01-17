import { AbaRegisterValidateTechnicalFeasibilityRequestDto } from './aba-register-validate-technical-feasibility-request.dto';
import { ICheckIpResponse } from '../../../raw/stored-procedures/check-ip/check-ip-response.interface';
import { IDeleteOrderResponse } from '../../../raw/stored-procedures/delete-order/delete-order-response.interface';
import { IGetAbaDataFromRequestsResponse } from '../../../raw/stored-procedures/get-aba-data-from-requests/get-aba-data-from-requests-response.interface';
import { IGetAbaDataResponse } from '../../../raw/stored-procedures/get-aba-data/get-aba-data-response.interface';
import { IGetAndRegisterQualifOfServiceResponse } from '../../../raw/stored-procedures/get-and-register-qualif-of-service/get-and-register-qualif-of-service-response.interface';
import { IGetASAPOrderDetailResponse } from 'src/raw/pic/get-asap-order-detail/get-asap-order-detail-response.interface';
import { IGetDataFromDSLAMPortIdResponse } from '../../../validate-technical-feasibility/get-data-from-dslam-port-id/get-data-from-dslam-port-id-response.interface';
import { IGetDHCPDataResponse } from 'src/raw/boss-api/get-dhcp-data/get-dhcp-data-response.interface';
import { IGetDownstreamFromPlanResponse } from '../../../validate-technical-feasibility/get-downstream-from-plan/get-downstream-from-plan-response.interface';
import { IGetDSLCentralCoIdByDSLAMPortIdResponse } from '../../../raw/stored-procedures/update-dsl-aba-registers/get-dsl-central-co-id-by-dslam-port-id-response.interface';
import { IGetPortIdFromIpResponse } from '../../../validate-technical-feasibility/get-port-id-from-ip/get-port-id-from-ip-response.interface';
import { IGetPortIdResponse } from '../../../validate-technical-feasibility/get-port-id/get-port-id-response.interface';
import { IInsertDslAbaRegistersResponse } from 'src/raw/stored-procedures/insert-dsl-aba-registers/insert-dsl-aba-registers-response.interface';
import { IIsPrepaidVoiceLineResponse } from '../../../raw/stored-procedures/is-prepaid-voice-line/is-prepaid-voice-line-response.interface';
import { IIsOccupiedPortResponse } from '../../../validate-technical-feasibility/Is-occupied-port/is-occupied-port-response.interface';
import { IIsValidIpAddressResponse } from '../../../validate-technical-feasibility/is-valid-ip-address/is-valid-ip-address-response.interface';
import { ILinkNetworkResponse } from 'src/raw/pic/get-asap-order-detail/Iink-network-response.interface';
import { IReadIABAOrderResponse } from '../../../validate-technical-feasibility/read-iaba-order/read-iaba-order-response.interface';
import { IVerifiyContractByPhoneResponse } from '../../../validate-technical-feasibility/verify-contract-by-phone/verify-contract-by-phone-response.interface';

export interface IAbaRegisterValidateTechnicalFeasibilityResponse {
  requestDto: AbaRegisterValidateTechnicalFeasibilityRequestDto;
  insertDslAbaRegistersResponse: IInsertDslAbaRegistersResponse;
  isPrepaidVoiceLine: IIsPrepaidVoiceLineResponse;
  getAndRegisterQualifOfServiceResponse: IGetAndRegisterQualifOfServiceResponse;
  verifyContractByPhoneResponse: IVerifiyContractByPhoneResponse;
  getDownstreamFromPlanResponse: IGetDownstreamFromPlanResponse;
  getABADataFromRequestsResponse: IGetAbaDataFromRequestsResponse;
  isValidIpAddressResponse: IIsValidIpAddressResponse;
  getPortIdFromIpResponse: IGetPortIdFromIpResponse;
  queryDHCPResponse: IGetDHCPDataResponse;
  getValidVPIResponse: string;
  getPortIdResponse: IGetPortIdResponse;
  isOccupiedPortResponse: IIsOccupiedPortResponse;
  getASAPOrderDetailResponse: IGetASAPOrderDetailResponse;
  linkNetworkResponse: ILinkNetworkResponse;
  getABADataResponse: IGetAbaDataResponse;
  checkIpResponse: ICheckIpResponse;
  getDataFromDslamPortIdResponse: IGetDataFromDSLAMPortIdResponse;
  deleteOrderResponse: IDeleteOrderResponse;
  readIABAOrderResponse: IReadIABAOrderResponse;
  getDSLCentralCoIdByDSLAMPortIdResponse: IGetDSLCentralCoIdByDSLAMPortIdResponse;
}
