import { BossConstants } from 'src/boss/boss.constants';
import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';

export class ReadIABAOrderGeneralDatabaseErrorException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: 'ace9fd1d-4403-4d20-a498-dff2b58bd3de',
      command: BossConstants.READ_IABA_ORDER,
      objectOrError: 'Error general de BD. Consultar con Administrador',
    });
  }
}
