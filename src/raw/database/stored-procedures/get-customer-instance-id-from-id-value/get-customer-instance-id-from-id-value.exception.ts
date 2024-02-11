import { BossConstants } from 'src/boss/boss.constants';
import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';
import { ExceptionHelper } from 'src/system/infrastructure/helpers/exception.helper';

export class GetCustomerInstanceIdFromIdValueException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: 'b41498a3-da09-4f59-8a94-be18b9a7def7',
      command: BossConstants.GET_CUSTOMER_INSTANCE_ID_FROM_ID_VALUE,
      objectOrError: ExceptionHelper.storedProcedureExecutionExceptionMessage(
        BossConstants.GET_CUSTOMER_INSTANCE_ID_FROM_ID_VALUE,
      ),
    });
  }
}
