import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';
import { toIException } from 'src/system/infrastructure/exceptions/custom-exceptions/exception.interface';

export class InsertDslAbaRegisterException extends CustomBadRequestException {
  constructor(innerException?: any) {
    super({
      code: '',
      guid: '4143d9e9-f1fa-4f73-885d-37b307b5d3fb',
      objectOrError: 'El usuario ya ha iniciado el registro en ABA',
      innerException: toIException(innerException),
    });
  }
}
