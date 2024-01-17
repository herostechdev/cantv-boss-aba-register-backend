import { BossConstants } from 'src/boss/boss.constants';
import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';
import { toIException } from 'src/system/infrastructure/exceptions/custom-exceptions/exception.interface';
import { ExceptionHelper } from 'src/system/infrastructure/helpers/exception.helper';

export class GetABADataFromRequestsException extends CustomBadRequestException {
  constructor(innerException?: any) {
    super({
      code: '',
      guid: '541a8aa4-ffd2-45b7-8fd4-eb43b7a693f3',
      objectOrError: ExceptionHelper.storedProcedureExecutionExceptionMessage(
        BossConstants.GET_ABA_DATA,
      ),
      innerException: toIException(innerException),
    });
  }
}
