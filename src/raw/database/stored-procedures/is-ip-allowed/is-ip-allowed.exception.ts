import { BossConstants } from 'src/boss/boss.constants';
import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';
import { toIException } from 'src/system/infrastructure/exceptions/custom-exceptions/exception.interface';
import { ExceptionHelper } from 'src/system/infrastructure/helpers/exception.helper';

export class IsIpAllowedException extends CustomBadRequestException {
  constructor(innerException?: any) {
    super({
      code: '',
      guid: 'a4abcfef-3400-4976-baa9-e8392359b7f9',
      command: BossConstants.GET_IF_REMOTE_INSTALLER_IP,
      objectOrError: ExceptionHelper.storedProcedureExecutionExceptionMessage(
        BossConstants.GET_IF_REMOTE_INSTALLER_IP,
      ),
      innerException: toIException(innerException),
    });
  }
}
