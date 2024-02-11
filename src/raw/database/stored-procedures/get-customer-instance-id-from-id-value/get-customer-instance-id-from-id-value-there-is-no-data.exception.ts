import { BossConstants } from 'src/boss/boss.constants';
import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';

export class GetCustomerInstanceIdFromIdValueThereIsNoDataException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: 'dd7aa1b3-d52f-4b00-bf67-4ab97020a134',
      command: BossConstants.GET_CUSTOMER_INSTANCE_ID_FROM_ID_VALUE,
      objectOrError: 'No hay datos',
    });
  }
}
