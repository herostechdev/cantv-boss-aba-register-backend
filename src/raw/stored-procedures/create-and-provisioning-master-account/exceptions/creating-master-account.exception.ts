import { BossConstants } from 'src/boss/boss.constants';
import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';

export class CreatingMasterAccountException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: 'b743b092-7ef0-4234-9844-c0edd9b65c93',
      command: BossConstants.CREATE_AND_PROVISIONING_MASTER_ACCOUNT,
      objectOrError: 'Error Creando Cuenta Maestra',
    });
  }
}
