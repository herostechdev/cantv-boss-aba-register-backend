import { BossConstants } from 'src/boss/boss.constants';
import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';
import { ExceptionHelper } from 'src/system/infrastructure/helpers/exception.helper';

export class ABARegisterException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: 'b790f1c3-b4a9-4ce1-a6e8-1861646a9c6f',
      command: BossConstants.ABA_REGISTER,
      objectOrError: ExceptionHelper.storedProcedureExecutionExceptionMessage(
        BossConstants.ABA_REGISTER,
      ),
    });
  }
}
