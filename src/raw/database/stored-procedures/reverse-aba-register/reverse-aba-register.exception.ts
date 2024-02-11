import { BossConstants } from 'src/boss/boss.constants';
import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';
import { toIException } from 'src/system/infrastructure/exceptions/custom-exceptions/exception.interface';
import { ExceptionHelper } from 'src/system/infrastructure/helpers/exception.helper';

export class ReverseAbaRegisterException extends CustomBadRequestException {
  constructor(innerException?: any) {
    super({
      code: '',
      guid: '2a27147a-a375-4285-b06f-e5dbb27d9ec2',
      command: BossConstants.REVERSE_ABA_REGISTER,
      objectOrError: ExceptionHelper.storedProcedureExecutionExceptionMessage(
        BossConstants.REVERSE_ABA_REGISTER,
      ),
      innerException: toIException(innerException),
    });
  }
}
