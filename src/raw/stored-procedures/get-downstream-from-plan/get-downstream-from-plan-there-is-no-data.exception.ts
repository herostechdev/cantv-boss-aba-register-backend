import { BossConstants } from 'src/boss/boss.constants';
import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';

export class GetDownstreamFromPlanThereIsNoDataException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: '209f8d3f-988d-46c1-a7e1-a902dce96ea5',
      command: BossConstants.GET_DOWNSTREAM_FROM_PLAN,
      objectOrError: 'No existen datos',
    });
  }
}
