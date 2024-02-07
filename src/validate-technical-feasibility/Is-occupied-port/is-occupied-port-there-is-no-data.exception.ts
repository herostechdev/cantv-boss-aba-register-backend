import { BossConstants } from 'src/boss/boss.constants';
import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';

export class IsOccupiedPortTherIsNoDataException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: 'b5cf7f1a-eac0-4bd9-8103-171f7835d424',
      command: BossConstants.IS_OCCUPIED_PORT,
      objectOrError:
        'No ha sido posible encontrar información al determinar si el puerto está ocupado',
    });
  }
}
