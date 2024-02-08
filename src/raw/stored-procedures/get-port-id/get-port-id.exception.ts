import { BossConstants } from 'src/boss/boss.constants';
import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';
import {
  IException,
  toIException,
} from 'src/system/infrastructure/exceptions/custom-exceptions/exception.interface';
import { ExceptionHelper } from 'src/system/infrastructure/helpers/exception.helper';

export class GetPortIdException extends CustomBadRequestException {
  constructor(innerException?: IException) {
    super({
      code: '',
      guid: '09214a19-62f9-4182-856a-410d9b07d8a1',
      command: BossConstants.GET_PORT_ID,
      objectOrError: ExceptionHelper.storedProcedureExecutionExceptionMessage(
        BossConstants.GET_PORT_ID,
      ),
      innerException: toIException(innerException),
    });
  }
}
