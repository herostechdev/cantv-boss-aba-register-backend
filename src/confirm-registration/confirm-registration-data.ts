import { IClientExistsResponse } from 'src/validate-client/client-exists/client-exists-response.interface';
import { ConfirmRegistrationRequestDto } from './confirm-registration-request.dto';
import { IGetPlanABAFromKenanResponse } from './get-plan-aba-from-kenan/get-plan-aba-from-kenan-response.interface';

export class ConfirmRegistrationData {
  requestDto: ConfirmRegistrationRequestDto;
  getPlanAbaFromKenanResponse: IGetPlanABAFromKenanResponse;
  clientExistsResponse: IClientExistsResponse;
}
