import { BossConstants } from 'src/boss/boss.constants';
import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';

export class CreatingHostingChargeException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: 'bef9266f-c2e0-4175-a82e-6260af93647f',
      command: BossConstants.CREATE_AND_PROVISIONING_MASTER_ACCOUNT,
      objectOrError: 'Error Creando Cargo de Hosting',
    });
  }
}
