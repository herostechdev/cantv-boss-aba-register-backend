import { BossConstants } from 'src/boss/boss.constants';
import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';

export class CustomerExistsThereIsNoDataException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: '3d281ea5-b4c4-4654-87d3-d347500d00e6',
      command: BossConstants.CUSTOMER_EXISTS,
      objectOrError: 'No hay datos',
    });
  }
}
