import { BossConstants } from 'src/boss/boss.constants';
import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';

export class CreatingAccountStatementException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: 'Error Creando Estado de Cuenta',
      command: BossConstants.CREATE_AND_PROVISIONING_MASTER_ACCOUNT,
      objectOrError: '',
    });
  }
}
