import { BossConstants } from 'src/boss/boss.constants';
import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';

export class GetPortIdFromIpBadIpFormatException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: '36a30f85-a7a7-40bd-b95b-2f8e1032a80b',
      command: BossConstants.GET_PORT_ID_FROM_IP,
      objectOrError: 'Error de Formato en la Dirección IP provista',
    });
  }
}
