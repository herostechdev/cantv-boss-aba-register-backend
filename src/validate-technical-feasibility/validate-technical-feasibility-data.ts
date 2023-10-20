import { IGetABADataFromRequestsResponse } from './responses/get-aba-data-from-requests-response.interface';
import { IGetDownstreamFromPlanResponse } from './responses/get-downstream-from-plan-response.interface';
import { IGetInfoFromABARequestsResponse } from './responses/get-info-from-aba-requests-response.interface';
import { IGetPortIdFromIpResponse } from './responses/get-port-id-from-ip-response.interface';
import { IIsValidIpAddressResponse } from './responses/is-valid-ip-address-response.interface';
import { IVerifiyContractByPhoneResponse } from './responses/verify-contract-by-phone-response.interface';
import { ValidateTechnicalFeasibilityRequestDto } from './validate-technical-feasibility-request.dto';

export class ValidateTechnicalFeasibilityData {
  requestDto: ValidateTechnicalFeasibilityRequestDto;
  insertDslAbaRegistersResponse: number;
  verifyContractByPhoneResponse: IVerifiyContractByPhoneResponse;
  getInfoFromABARequestsResponse: IGetInfoFromABARequestsResponse;
  getDownstreamFromPlanResponse: IGetDownstreamFromPlanResponse;
  getABADataFromRequestsResponse: IGetABADataFromRequestsResponse;
  isValidIpAddressResponse: IIsValidIpAddressResponse;
  getPortidFromIpResponse: IGetPortIdFromIpResponse;
  getValidVPIResponse: number;
}
