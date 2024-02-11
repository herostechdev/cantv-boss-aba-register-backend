import { BossConstants } from 'src/boss/boss.constants';
import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';

export class CreatingContractException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: '55ccb0b0-bb6e-41d6-ab8b-280d825c614c',
      command: BossConstants.CREATE_AND_PROVISIONING_MASTER_ACCOUNT,
      objectOrError: 'Error Creando Contrato',
    });
  }
}
