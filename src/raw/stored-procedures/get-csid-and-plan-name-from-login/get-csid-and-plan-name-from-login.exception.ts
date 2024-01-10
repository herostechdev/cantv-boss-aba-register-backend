import { BossConstants } from 'src/boss-helpers/boss.constants';
import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';
import { toIException } from 'src/system/infrastructure/exceptions/custom-exceptions/exception.interface';

export class GetCSIdAndPlanNameFromLoginException extends CustomBadRequestException {
  constructor(innerException?: any) {
    super({
      code: '',
      guid: 'c0d3e460-5fb2-45f2-a945-fe36cdea98eb',
      objectOrError: `Error al ejecutar el SP ${BossConstants.GET_CSID_AND_PLAN_NAME_FROM_LOGIN}`,
      innerException: toIException(innerException),
    });
  }
}
