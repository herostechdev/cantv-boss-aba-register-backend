import { BossConstants } from 'src/boss/boss.constants';
import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';

export class CreatingBillingChargeException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: '424abb04-4985-4c1b-9fc0-89f569c3db25',
      command: BossConstants.CREATE_AND_PROVISIONING_MASTER_ACCOUNT,
      objectOrError: 'Error Creando Cargo de Facturación',
    });
  }
}
