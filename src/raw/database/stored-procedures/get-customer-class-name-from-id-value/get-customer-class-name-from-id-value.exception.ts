import { BossConstants } from 'src/boss/boss.constants';
import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';
import { ExceptionHelper } from 'src/system/infrastructure/helpers/exception.helper';

export class GetCustomerClassNameFromIdValueException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: 'f6d6d3ba-d7d0-4cbe-8317-394e6c11bc60',
      command: BossConstants.GET_CUSTOMER_CLASS_NAME_FROM_ID_VALUE,
      objectOrError: ExceptionHelper.storedProcedureExecutionExceptionMessage(
        BossConstants.GET_CUSTOMER_CLASS_NAME_FROM_ID_VALUE,
      ),
    });
  }
}
