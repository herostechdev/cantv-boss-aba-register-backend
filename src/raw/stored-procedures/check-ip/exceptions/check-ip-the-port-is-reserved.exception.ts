import { BossConstants } from 'src/boss/boss.constants';
import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';

export class CheckIpThePortIsReservedException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: '2245ebb9-8330-434b-8a93-a507861bf7e7',
      command: BossConstants.CHECK_IP,
      objectOrError: 'El puerto está reservado',
    });
  }
}
