import { BossConstants } from 'src/boss/boss.constants';
import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';
import { ExceptionHelper } from 'src/system/infrastructure/helpers/exception.helper';
import {
  IException,
  toIException,
} from 'src/system/infrastructure/exceptions/custom-exceptions/exception.interface';

export class GetDSLAreaCodesException extends CustomBadRequestException {
  constructor(innerException?: IException) {
    super({
      code: '',
      guid: '384365fb-5642-48da-b890-dac7d3051577',
      command: BossConstants.GET_DSL_AREA_CODES,
      objectOrError: ExceptionHelper.storedProcedureExecutionExceptionMessage(
        BossConstants.GET_DSL_AREA_CODES,
      ),
      innerException: toIException(innerException),
    });
  }
}
