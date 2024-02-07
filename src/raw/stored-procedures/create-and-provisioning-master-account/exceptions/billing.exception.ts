import { BossConstants } from 'src/boss/boss.constants';
import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';

export class BillingException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: '015df858-38c8-4717-a7b8-42f77964e189',
      command: BossConstants.CREATE_AND_PROVISIONING_MASTER_ACCOUNT,
      objectOrError: 'Error Facturando',
    });
  }
}
