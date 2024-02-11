import { BossConstants } from 'src/boss/boss.constants';
import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';
import { ExceptionHelper } from 'src/system/infrastructure/helpers/exception.helper';

export class DeleteOrderException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: '08c62b8a-caa0-4b9d-8c92-8dd0c2baca09',
      command: BossConstants.DELETE_ORDER,
      objectOrError: ExceptionHelper.storedProcedureExecutionExceptionMessage(
        BossConstants.DELETE_ORDER,
      ),
    });
  }
}
