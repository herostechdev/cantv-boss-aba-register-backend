import { BossConstants } from 'src/boss/boss.constants';
import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';

export class GetCSIdAndPlanNameFromLoginThereIsNoDataException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: '9ca62abb-51ba-48ec-9200-b0616f0a1ecc',
      command: BossConstants.GET_CSID_AND_PLAN_NAME_FROM_LOGIN,
      objectOrError: 'No se encontraron datos',
    });
  }
}
