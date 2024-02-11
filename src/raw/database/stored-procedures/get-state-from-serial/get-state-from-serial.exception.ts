import { BossConstants } from 'src/boss/boss.constants';
import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';
import { ExceptionHelper } from 'src/system/infrastructure/helpers/exception.helper';

export class GetStateFromSerialException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      command: BossConstants.GET_STATE_FROM_SERIAL,
      objectOrError: ExceptionHelper.storedProcedureExecutionExceptionMessage(
        BossConstants.GET_STATE_FROM_SERIAL,
      ),
    });
  }
}
