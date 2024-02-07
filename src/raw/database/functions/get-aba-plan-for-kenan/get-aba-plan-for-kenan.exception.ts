import { BossConstants } from 'src/boss/boss.constants';
import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';
import { ExceptionHelper } from 'src/system/infrastructure/helpers/exception.helper';

export class GetAbaPlanForKenanException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: 'b6087ebe-76ac-4161-b04b-d718592b56dd',
      command: BossConstants.GET_ABA_PLAN_FOR_KENAN,
      objectOrError: ExceptionHelper.storedProcedureExecutionExceptionMessage(
        BossConstants.GET_ABA_PLAN_FOR_KENAN,
      ),
    });
  }
}
