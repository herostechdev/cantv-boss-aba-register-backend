import { BossConstants } from 'src/boss/boss.constants';
import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';

export class GetDataFromDSLAMPortIdThereIsNoDataException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: '9173b927-0960-4dcc-886a-54fb4eb83b4c',
      command: BossConstants.GET_DATA_FROM_DSLAM_PORT_ID,
      objectOrError: 'No hay datos del DSLAM dado el Puerto en BOSS',
    });
  }
}
