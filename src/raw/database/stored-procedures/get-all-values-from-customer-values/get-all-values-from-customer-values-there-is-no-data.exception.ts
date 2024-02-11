import { BossConstants } from 'src/boss/boss.constants';
import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';

export class GetAllValuesFromCustomerValuesThereIsNoDataException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: '595818f0-5335-47b4-9ef5-f4a2be05a7a9',
      command: BossConstants.GET_ALL_VALUES_FROM_CUSTOMER_VALUES,
      objectOrError: 'No hay datos',
    });
  }
}
