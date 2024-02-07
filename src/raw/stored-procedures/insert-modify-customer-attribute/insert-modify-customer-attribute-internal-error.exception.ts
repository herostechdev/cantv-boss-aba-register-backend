import { BossConstants } from 'src/boss/boss.constants';
import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';
import { ExceptionHelper } from 'src/system/infrastructure/helpers/exception.helper';

export class InsertModifyCustomerAttributeInternalErrorException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: '7c5579d9-afce-4422-8baf-c65224fd9ead',
      command: BossConstants.INSERT_MODIFY_CUSTOMER_ATTRIBUTE,
      objectOrError: ExceptionHelper.storedProcedureExecutionExceptionMessage(
        BossConstants.INSERT_MODIFY_CUSTOMER_ATTRIBUTE,
      ),
    });
  }
}
