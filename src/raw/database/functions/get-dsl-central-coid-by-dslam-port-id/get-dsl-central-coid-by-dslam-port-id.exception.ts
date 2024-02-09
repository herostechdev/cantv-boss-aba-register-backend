import { BossConstants } from 'src/boss/boss.constants';
import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';
import {
  IException,
  toIException,
} from 'src/system/infrastructure/exceptions/custom-exceptions/exception.interface';
import { ExceptionHelper } from 'src/system/infrastructure/helpers/exception.helper';

export class GetDSLCentralCoIdByDSLAMPortIdException extends CustomBadRequestException {
  constructor(innerException?: IException) {
    super({
      code: '',
      guid: '920b3d63-556e-4208-8093-53f71c4ea8db',
      command: BossConstants.GET_DSL_CENTRAL_CO_ID_BY_DSLAM_PORT_ID,
      objectOrError: ExceptionHelper.functionExecutionExceptionMessage(
        BossConstants.GET_DSL_CENTRAL_CO_ID_BY_DSLAM_PORT_ID,
      ),
      innerException: toIException(innerException),
    });
  }
}
