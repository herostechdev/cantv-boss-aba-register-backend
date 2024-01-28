import { BossConstants } from 'src/boss/boss.constants';
import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';
import { ExceptionHelper } from 'src/system/infrastructure/helpers/exception.helper';

export class IsValidIpAddressException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: '5d8fb466-6bf0-4c5c-8419-e6ddf628dfb1',
      objectOrError: ExceptionHelper.storedProcedureExecutionExceptionMessage(
        BossConstants.IS_VALID_IP_ADDRESS,
      ),
    });
  }
}
