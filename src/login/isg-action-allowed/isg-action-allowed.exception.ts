import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';
import { toIException } from 'src/system/infrastructure/exceptions/custom-exceptions/exception.interface';

export class ISGActionAllowedException extends CustomBadRequestException {
  constructor(innerException?: any) {
    super({
      code: '',
      guid: 'a254f7e1-3b0a-4b85-907a-279b58f669e7',
      objectOrError: 'Error al ejecutar el SP ISGActionAllowed',
      innerException: toIException(innerException),
    });
  }
}
