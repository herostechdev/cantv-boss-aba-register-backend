import { BossConstants } from 'src/boss/boss.constants';
import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';

export class ReadIABAOrderTheOrderAlreadyExistsInBossException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: '9c8316d3-2d45-4963-8226-84e18d9ddd28',
      command: BossConstants.READ_IABA_ORDER,
      objectOrError:
        'La oOrden ya existe en BOSS pero con diferente red de enlace',
    });
  }
}
