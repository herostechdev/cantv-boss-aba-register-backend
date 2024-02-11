import { BossConstants } from 'src/boss/boss.constants';
import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';

export class CustomerExistsException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: '01a9f325-1042-4e6d-8949-04caca5a8f4e',
      command: BossConstants.CUSTOMER_EXISTS,
      objectOrError: 'Ha ocurrido un error al ejecutar el SP ClientExist',
    });
  }
}
