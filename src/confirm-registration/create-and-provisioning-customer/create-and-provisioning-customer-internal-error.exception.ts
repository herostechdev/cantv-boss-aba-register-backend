import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';
import {
  IException,
  toIException,
} from 'src/system/infrastructure/exceptions/custom-exceptions/exception.interface';

export class CreateAndProvisioningCustomerInternalErrorException extends CustomBadRequestException {
  constructor(innerException?: IException) {
    super({
      code: '',
      guid: '0da067f3-cbd2-42bc-ae12-18f90951ba81',
      objectOrError:
        'Ha ocurrido un error al ejecutar el SP CreateAndProvisionClient',
      innerException: toIException(innerException),
    });
  }
}
