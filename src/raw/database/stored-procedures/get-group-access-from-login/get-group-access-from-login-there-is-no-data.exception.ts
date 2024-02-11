import { BossConstants } from 'src/boss/boss.constants';
import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';

export class GetGroupAccessFromLoginThereIsNoDataException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: 'a000352b-74c1-4855-a649-c21026c5bc31',
      command: BossConstants.GET_GROUP_ACCESS_FROM_LOGIN,
      objectOrError: 'Sin datos en la consulta. Transacción no exitosa',
    });
  }
}
