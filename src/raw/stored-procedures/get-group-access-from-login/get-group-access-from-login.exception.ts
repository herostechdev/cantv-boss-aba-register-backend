import { BossConstants } from 'src/boss/boss.constants';
import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';
import { toIException } from 'src/system/infrastructure/exceptions/custom-exceptions/exception.interface';
import { ExceptionHelper } from 'src/system/infrastructure/helpers/exception.helper';

export class GetGroupAccessFromLoginException extends CustomBadRequestException {
  constructor(innerException?: any) {
    super({
      code: '',
      guid: '9b579c40-6dc0-49b7-b5ca-ee6ce0e4207f',
      command: BossConstants.GET_GROUP_ACCESS_FROM_LOGIN,
      objectOrError: ExceptionHelper.storedProcedureExecutionExceptionMessage(
        BossConstants.GET_GROUP_ACCESS_FROM_LOGIN,
      ),
      innerException: toIException(innerException),
    });
  }
}
