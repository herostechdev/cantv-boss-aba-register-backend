import { BossConstants } from 'src/boss/boss.constants';
import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';
import {
  IException,
  toIException,
} from 'src/system/infrastructure/exceptions/custom-exceptions/exception.interface';
import { ExceptionHelper } from 'src/system/infrastructure/helpers/exception.helper';

export class CreateAndProvisioningCustomerException extends CustomBadRequestException {
  constructor(innerException?: IException) {
    super({
      code: '',
      guid: '0da067f3-cbd2-42bc-ae12-18f90951ba81',
      command: BossConstants.CREATE_AND_PROVISIONING_CUSTOMER,
      objectOrError: ExceptionHelper.storedProcedureExecutionExceptionMessage(
        BossConstants.CREATE_AND_PROVISIONING_CUSTOMER,
      ),
      innerException: toIException(innerException),
    });
  }
}
