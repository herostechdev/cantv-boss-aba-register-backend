import { BossConstants } from 'src/boss/boss.constants';
import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';
import { ExceptionHelper } from 'src/system/infrastructure/helpers/exception.helper';

export class CreateAndProvisioningMasterAccountException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: '9dc3cefb-fcf8-4241-b800-f677d25dbdcc',
      command: BossConstants.CREATE_AND_PROVISIONING_MASTER_ACCOUNT,
      objectOrError: ExceptionHelper.storedProcedureExecutionExceptionMessage(
        BossConstants.CREATE_AND_PROVISIONING_MASTER_ACCOUNT,
      ),
    });
  }
}
