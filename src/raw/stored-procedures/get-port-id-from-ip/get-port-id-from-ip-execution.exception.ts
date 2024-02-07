import { BossConstants } from 'src/boss/boss.constants';
import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';
import { ExceptionHelper } from 'src/system/infrastructure/helpers/exception.helper';

export class GetPortIdFromIpExecutionException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: '8b2634a3-2cbe-44ef-9797-f05a5ca0c3e8',
      command: BossConstants.GET_PORT_ID_FROM_IP,
      objectOrError: ExceptionHelper.storedProcedureExecutionExceptionMessage(
        BossConstants.GET_PORT_ID_FROM_IP,
      ),
    });
  }
}
