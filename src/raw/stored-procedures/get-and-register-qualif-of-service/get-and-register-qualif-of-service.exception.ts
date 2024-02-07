import { BossConstants } from 'src/boss/boss.constants';
import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';
import { toIException } from 'src/system/infrastructure/exceptions/custom-exceptions/exception.interface';
import { ExceptionHelper } from 'src/system/infrastructure/helpers/exception.helper';

export class GetAndRegisterQualifOfServiceException extends CustomBadRequestException {
  constructor(innerException?: any) {
    super({
      code: '',
      guid: 'ba286f3e-2bdb-42e1-a502-acb066d9e02c',
      command: BossConstants.GET_AND_REGISTER_QUALIF_OF_SERVICE,
      objectOrError: ExceptionHelper.storedProcedureExecutionExceptionMessage(
        BossConstants.GET_AND_REGISTER_QUALIF_OF_SERVICE,
      ),
      innerException: toIException(innerException),
    });
  }
}
