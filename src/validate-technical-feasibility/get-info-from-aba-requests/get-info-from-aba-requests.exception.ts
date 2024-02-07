import { BossConstants } from 'src/boss/boss.constants';
import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';
import { toIException } from 'src/system/infrastructure/exceptions/custom-exceptions/exception.interface';
import { ExceptionHelper } from 'src/system/infrastructure/helpers/exception.helper';

export class GetInfoFromABARequestsException extends CustomBadRequestException {
  constructor(innerException?: any) {
    super({
      code: '',
      guid: 'b12ca51e-9184-422e-8e61-5b5a5f1df1eb',
      command: BossConstants.GET_INFO_FROM_ABA_REQUESTS,
      objectOrError: ExceptionHelper.storedProcedureExecutionExceptionMessage(
        BossConstants.GET_INFO_FROM_ABA_REQUESTS,
      ),
      innerException: toIException(innerException),
    });
  }
}
