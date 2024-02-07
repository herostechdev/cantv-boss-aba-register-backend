import { BossConstants } from 'src/boss/boss.constants';
import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';

export class ABARegisterThereIsNoDataException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: '2c34c34b-2b6d-44ab-8216-bdbe12ef7cad',
      command: BossConstants.UNKNOWN,
      objectOrError: 'No hay datos',
    });
  }
}
