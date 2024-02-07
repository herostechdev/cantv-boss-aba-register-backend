import { BossConstants } from 'src/boss/boss.constants';
import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';

export class CreateAndProvisioningMasterAccountThereIsNoDataException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: '5121ab8c-991b-42aa-9f69-cdc4415c190f',
      command: BossConstants.CREATE_AND_PROVISIONING_MASTER_ACCOUNT,
      objectOrError: 'Error No Hay Datos',
    });
  }
}
