import { BossConstants } from 'src/boss/boss.constants';
import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';
import { ExceptionHelper } from 'src/system/infrastructure/helpers/exception.helper';

export class CheckIpThePortIsOccupiedByAnotherContractException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: '6bb581b2-dbc2-43dc-9a97-4095e0220db0',
      command: BossConstants.CHECK_IP,
      objectOrError: ExceptionHelper.storedProcedureExecutionExceptionMessage(
        BossConstants.CHECK_IP,
      ),
    });
  }
}
