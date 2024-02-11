import { BossConstants } from 'src/boss/boss.constants';
import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';
import { toIException } from 'src/system/infrastructure/exceptions/custom-exceptions/exception.interface';
import { ExceptionHelper } from 'src/system/infrastructure/helpers/exception.helper';

export class InsertDslAbaRegisterException extends CustomBadRequestException {
  constructor(innerException?: any) {
    super({
      code: '',
      guid: '4143d9e9-f1fa-4f73-885d-37b307b5d3fb',
      command: BossConstants.INSERT_DSL_ABA_REGISTERS,
      objectOrError: ExceptionHelper.storedProcedureExecutionExceptionMessage(
        BossConstants.INSERT_DSL_ABA_REGISTERS,
      ),
      innerException: toIException(innerException),
    });
  }
}
