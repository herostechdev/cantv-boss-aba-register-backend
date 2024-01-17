import { BossConstants } from 'src/boss/boss.constants';
import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';
import { ExceptionHelper } from 'src/system/infrastructure/helpers/exception.helper';

export class GetDataFromDSLAMPortIdException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: '1b213953-b7f7-4fed-8b55-8770f5a3cfe9',
      objectOrError: ExceptionHelper.storedProcedureExecutionExceptionMessage(
        BossConstants.GET_DATA_FROM_DSLAM_PORT_ID,
      ),
    });
  }
}
