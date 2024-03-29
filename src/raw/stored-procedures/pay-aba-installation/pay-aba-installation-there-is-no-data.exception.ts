import { BossConstants } from 'src/boss/boss.constants';
import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';

export class PayABAInstallationThereIsNoDataException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: '0b94440a-69c6-4c71-8920-a4d4ce686210',
      command: BossConstants.PAY_ABA_INSTALLATION,
      objectOrError: 'No hay datos',
    });
  }
}
