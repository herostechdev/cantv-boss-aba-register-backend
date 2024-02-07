import { BossConstants } from 'src/boss/boss.constants';
import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';

export class TheClientAlreadyHasABAServiceException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: 'd6068300-b9c8-42a8-b4db-99e514bcf830',
      command: BossConstants.GET_ABA_DATA,
      objectOrError: 'El cliente ya tiene el servicio ABA',
    });
  }
}
