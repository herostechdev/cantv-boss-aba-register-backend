import { BossConstants } from 'src/boss/boss.constants';
import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';
import { toIException } from 'src/system/infrastructure/exceptions/custom-exceptions/exception.interface';
import { ExceptionHelper } from 'src/system/infrastructure/helpers/exception.helper';

export class GetOrderIdFromABASalesException extends CustomBadRequestException {
  constructor(innerException?: any) {
    super({
      code: '',
      guid: 'fa9a1ddf-fc90-45cc-a89d-f99cdf99a79e',
      command: BossConstants.GET_ORDER_ID_FROM_ABA_SALES,
      objectOrError: ExceptionHelper.storedProcedureExecutionExceptionMessage(
        BossConstants.GET_ORDER_ID_FROM_ABA_SALES,
      ),
      innerException: toIException(innerException),
    });
  }
}
