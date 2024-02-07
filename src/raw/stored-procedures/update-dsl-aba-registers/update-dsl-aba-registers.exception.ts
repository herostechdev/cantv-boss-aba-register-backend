import { BossConstants } from 'src/boss/boss.constants';
import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';
import { ExceptionHelper } from 'src/system/infrastructure/helpers/exception.helper';

export class UpdateDslAbaRegistersException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: 'd415202c-270b-41dc-af1c-faf7b30c1ae9',
      command: BossConstants.UPDATE_DSL_ABA_REGISTERS,
      objectOrError: ExceptionHelper.storedProcedureExecutionExceptionMessage(
        BossConstants.UPDATE_DSL_ABA_REGISTERS,
      ),
    });
  }
}
