import { BossConstants } from 'src/boss/boss.constants';
import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';

export class CreatingSubaccountException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: '32ba9599-ed08-4aba-abd8-dd8d4b47a44e',
      command: BossConstants.CREATE_AND_PROVISIONING_MASTER_ACCOUNT,
      objectOrError: 'Error Creando Subcuenta',
    });
  }
}
