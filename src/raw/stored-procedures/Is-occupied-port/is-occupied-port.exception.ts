import { BossConstants } from 'src/boss/boss.constants';
import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';
import { ExceptionHelper } from 'src/system/infrastructure/helpers/exception.helper';

export class IsOccupiedPortException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: 'df143a11-2d3e-4ca9-b25d-ce40a965e5ac',
      command: BossConstants.IS_OCCUPIED_PORT,
      objectOrError: ExceptionHelper.storedProcedureExecutionExceptionMessage(
        BossConstants.IS_OCCUPIED_PORT,
      ),
    });
  }
}
