import { BossConstants } from 'src/boss/boss.constants';
import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';
import { ExceptionHelper } from 'src/system/infrastructure/helpers/exception.helper';

export class GetDownstreamFromPlanException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: '620dc849-9ba3-4132-992a-7ba39fd91935',
      objectOrError: ExceptionHelper.storedProcedureExecutionExceptionMessage(
        BossConstants.GET_DOWNSTREAM_FROM_PLAN,
      ),
    });
  }
}
