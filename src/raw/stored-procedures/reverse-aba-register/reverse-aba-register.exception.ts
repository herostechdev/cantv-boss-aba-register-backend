import { BossConstants } from 'src/boss/boss.constants';
import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';
import { toIException } from 'src/system/infrastructure/exceptions/custom-exceptions/exception.interface';

export class ReverseAbaRegisterException extends CustomBadRequestException {
  constructor(innerException?: any) {
    super({
      code: '',
      guid: '2a27147a-a375-4285-b06f-e5dbb27d9ec2',
      objectOrError: `Error al ejecutar el SP ${BossConstants.REVERSE_ABA_REGISTER}`,
      innerException: toIException(innerException),
    });
  }
}
