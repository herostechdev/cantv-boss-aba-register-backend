import { BossConstants } from 'src/boss/boss.constants';
import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';
import { ExceptionHelper } from 'src/system/infrastructure/helpers/exception.helper';

export class UpdatePasswordFromLoginException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: 'cee579fd-6574-49fc-96d0-aeb833cd11b2',
      command: BossConstants.UPDATE_PASSWORD_FROM_LOGIN,
      objectOrError: ExceptionHelper.storedProcedureExecutionExceptionMessage(
        BossConstants.UPDATE_PASSWORD_FROM_LOGIN,
      ),
    });
  }
}
