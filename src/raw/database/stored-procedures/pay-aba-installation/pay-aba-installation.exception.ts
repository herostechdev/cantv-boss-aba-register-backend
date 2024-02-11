import { BossConstants } from 'src/boss/boss.constants';
import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';
import { ExceptionHelper } from 'src/system/infrastructure/helpers/exception.helper';

export class CancelABAInstallationException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: '8eeb931b-7549-4e38-b4a1-ce42b996d902',
      command: BossConstants.PAY_ABA_INSTALLATION,
      objectOrError: ExceptionHelper.storedProcedureExecutionExceptionMessage(
        BossConstants.PAY_ABA_INSTALLATION,
      ),
    });
  }
}
