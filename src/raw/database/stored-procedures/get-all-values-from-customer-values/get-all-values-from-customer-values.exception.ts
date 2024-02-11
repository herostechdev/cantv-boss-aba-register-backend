import { BossConstants } from 'src/boss/boss.constants';
import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';
import { ExceptionHelper } from 'src/system/infrastructure/helpers/exception.helper';

export class GetAllValuesFromCustomerValuesException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: '6b45a960-375e-4300-b0eb-533fb991444e',
      command: BossConstants.GET_ALL_VALUES_FROM_CUSTOMER_VALUES,
      objectOrError: ExceptionHelper.storedProcedureExecutionExceptionMessage(
        BossConstants.GET_ALL_VALUES_FROM_CUSTOMER_VALUES,
      ),
    });
  }
}
