import { BossConstants } from 'src/boss/boss.constants';
import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';
import { ExceptionHelper } from 'src/system/infrastructure/helpers/exception.helper';

export class PlansByCustomerClassException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: 'bd958810-5ed6-4530-97e6-bc2f39297fe3',
      command: BossConstants.PLAN_BY_CUSTOMER_CLASS,
      objectOrError: ExceptionHelper.storedProcedureExecutionExceptionMessage(
        BossConstants.PLAN_BY_CUSTOMER_CLASS,
      ),
    });
  }
}
