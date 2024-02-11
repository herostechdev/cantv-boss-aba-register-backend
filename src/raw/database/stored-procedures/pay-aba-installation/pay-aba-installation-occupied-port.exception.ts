import { BossConstants } from 'src/boss/boss.constants';
import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';

export class PayABAInstallationOccupiedPortException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: '4ac70266-b50c-4e7f-844d-b05213771345',
      command: BossConstants.UNKNOWN,
      objectOrError: 'Puerto Ocupado',
    });
  }
}
