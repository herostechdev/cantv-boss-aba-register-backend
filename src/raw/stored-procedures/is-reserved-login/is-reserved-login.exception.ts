import { BossConstants } from 'src/boss/boss.constants';
import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';
import { toIException } from 'src/system/infrastructure/exceptions/custom-exceptions/exception.interface';

export class IsReservedLoginException extends CustomBadRequestException {
  constructor(innerException?: any) {
    super({
      code: '',
      guid: '655b8a4f-55f5-4be6-8474-bbbeaddc5a96',
      objectOrError: `Ha ocurrido un error al ejecutar el SP ${BossConstants.IS_RESERVED_LOGIN}`,
      innerException: toIException(innerException),
    });
  }
}
