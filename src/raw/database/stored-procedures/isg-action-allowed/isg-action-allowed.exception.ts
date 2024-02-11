import { BossConstants } from 'src/boss/boss.constants';
import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';
import { toIException } from 'src/system/infrastructure/exceptions/custom-exceptions/exception.interface';
import { ExceptionHelper } from 'src/system/infrastructure/helpers/exception.helper';

export class ISGActionAllowedException extends CustomBadRequestException {
  constructor(innerException?: any) {
    super({
      code: '',
      guid: 'a254f7e1-3b0a-4b85-907a-279b58f669e7',
      command: BossConstants.ISG_ACTION_ALLOWED,
      objectOrError: ExceptionHelper.storedProcedureExecutionExceptionMessage(
        BossConstants.ISG_ACTION_ALLOWED,
      ),
      innerException: toIException(innerException),
    });
  }
}
