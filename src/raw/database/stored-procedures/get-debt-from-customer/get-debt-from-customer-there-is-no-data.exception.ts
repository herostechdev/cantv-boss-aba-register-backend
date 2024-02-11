import { BossConstants } from 'src/boss/boss.constants';
import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';

export class GetDebtFromCustomerThereIsNoDataException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: '2aa2b4d5-168e-4a11-a1b2-ce508281d2bd',
      command: BossConstants.GET_DEBT_FROM_CUSTOMER,
      objectOrError: 'No hay datos',
    });
  }
}
