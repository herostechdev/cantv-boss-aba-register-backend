import { BossConstants } from 'src/boss/boss.constants';
import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';

export class CreatingPaymentInstanceException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: '2daa6a98-efbd-4c10-b2b5-b2f1434626d1',
      command: BossConstants.CREATE_AND_PROVISIONING_MASTER_ACCOUNT,
      objectOrError: 'Error Creando Instancia de Pago',
    });
  }
}
