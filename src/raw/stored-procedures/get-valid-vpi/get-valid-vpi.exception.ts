import { BossConstants } from 'src/boss/boss.constants';
import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';
import { ExceptionHelper } from 'src/system/infrastructure/helpers/exception.helper';

export class GetValidVPIException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: '8a07225e-017c-4afd-8f30-40326ae0068c',
      command: BossConstants.GET_VALID_VPI,
      objectOrError: ExceptionHelper.storedProcedureExecutionExceptionMessage(
        BossConstants.GET_VALID_VPI,
      ),
    });
  }
}
