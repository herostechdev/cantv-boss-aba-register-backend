import { BossConstants } from 'src/boss/boss.constants';
import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';
import { toIException } from 'src/system/infrastructure/exceptions/custom-exceptions/exception.interface';
import { ExceptionHelper } from 'src/system/infrastructure/helpers/exception.helper';

export class CheckIpException extends CustomBadRequestException {
  constructor(innerException?: any) {
    super({
      code: '',
      guid: '7159e673-b6fe-4f67-b436-e3794dc790e7',
      command: BossConstants.CHECK_IP,
      objectOrError: ExceptionHelper.storedProcedureExecutionExceptionMessage(
        BossConstants.CHECK_IP,
      ),
      innerException: toIException(innerException),
    });
  }
}
