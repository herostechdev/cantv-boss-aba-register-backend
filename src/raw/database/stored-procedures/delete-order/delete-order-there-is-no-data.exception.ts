import { BossConstants } from 'src/boss/boss.constants';
import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';

export class DeleteOrderThereIsNoDataException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: '6f26a28c-78db-4380-9fbc-f0ec80b4d89cc',
      command: BossConstants.DELETE_ORDER,
      objectOrError: 'No hay datos del Puerto en BOSS ',
    });
  }
}
