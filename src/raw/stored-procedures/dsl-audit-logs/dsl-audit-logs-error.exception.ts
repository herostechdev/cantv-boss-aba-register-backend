import { BossConstants } from 'src/boss/boss.constants';
import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';
import { ExceptionHelper } from 'src/system/infrastructure/helpers/exception.helper';

export class DSLAuditLogsErrorException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: '2872ce30-d337-4fca-974a-0eb7f20493e8',
      command: BossConstants.INSERT_DSL_AUDIT_LOGS,
      objectOrError: ExceptionHelper.storedProcedureExecutionExceptionMessage(
        BossConstants.DELETE_ORDER,
      ),
    });
  }
}
