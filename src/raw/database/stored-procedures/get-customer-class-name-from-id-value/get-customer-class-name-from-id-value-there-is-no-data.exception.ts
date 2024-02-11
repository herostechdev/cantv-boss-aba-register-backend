import { BossConstants } from 'src/boss/boss.constants';
import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';

export class GetCustomerClassNameFromIdValueThereIsNoDataException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: '459bd162-dcb0-4e26-932c-eef17849acf3',
      command: BossConstants.CREATE_AND_PROVISIONING_MASTER_ACCOUNT,
      objectOrError: 'No hay datos',
    });
  }
}
