import { BossConstants } from 'src/boss/boss.constants';
import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';
import { ExceptionHelper } from 'src/system/infrastructure/helpers/exception.helper';

export class GetDebtFromCustomerException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: '252ef2d3-e525-4ba9-bbb5-8e33ab2a5938',
      command: BossConstants.GET_DEBT_FROM_CUSTOMER,
      objectOrError: ExceptionHelper.storedProcedureExecutionExceptionMessage(
        BossConstants.GET_DEBT_FROM_CUSTOMER,
      ),
    });
  }
}
