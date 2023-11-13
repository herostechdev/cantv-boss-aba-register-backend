import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';
import { toIException } from 'src/system/infrastructure/exceptions/custom-exceptions/exception.interface';

export class GetInfoFromABARequestsException extends CustomBadRequestException {
  constructor(innerException?: any) {
    super({
      code: '',
      guid: 'b12ca51e-9184-422e-8e61-5b5a5f1df1eb',
      objectOrError: 'Error al ejecutar el SP GetInfoFromABARequests',
      innerException: toIException(innerException),
    });
  }
}
