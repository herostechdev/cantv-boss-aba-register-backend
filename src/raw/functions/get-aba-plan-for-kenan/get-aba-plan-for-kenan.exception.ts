import { BossConstants } from 'src/boss-helpers/boss.constants';
import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';

export class GetAbaPlanForKenanException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: 'b6087ebe-76ac-4161-b04b-d718592b56dd',
      objectOrError: `Error al ejecutar el SP ${BossConstants.GET_ABA_PLAN_FOR_KENAN}`,
    });
  }
}
