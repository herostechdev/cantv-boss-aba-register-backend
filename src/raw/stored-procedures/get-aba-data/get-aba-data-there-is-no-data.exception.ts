import { BossConstants } from 'src/boss/boss.constants';
import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';

export class GetABADataThereIsNoDataException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: 'f4621a56-7eb3-4b4d-9f2f-c135a59add15',
      command: BossConstants.GET_ABA_DATA,
      objectOrError: `No ha sido posible encontrar información al ejecutar el SP ${BossConstants.GET_ABA_DATA}`,
    });
  }
}
