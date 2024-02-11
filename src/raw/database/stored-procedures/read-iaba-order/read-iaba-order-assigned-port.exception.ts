import { BossConstants } from 'src/boss/boss.constants';
import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';

export class ReadIABAOrderAssignedPortException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: 'b5878968-280d-4fe4-b473-15c827796955',
      command: BossConstants.READ_IABA_ORDER,
      objectOrError: 'Puerto Asignado',
    });
  }
}
