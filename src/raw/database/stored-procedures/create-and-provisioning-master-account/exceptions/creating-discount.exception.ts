import { BossConstants } from 'src/boss/boss.constants';
import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';

export class CreatingDiscountException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: '3e4d5bd9-c71f-4f3f-b021-dc312d6a011b',
      command: BossConstants.CREATE_AND_PROVISIONING_MASTER_ACCOUNT,
      objectOrError: 'Error Creando Descuento',
    });
  }
}
