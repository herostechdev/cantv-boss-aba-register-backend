import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';
import {
  IException,
  toIException,
} from 'src/system/infrastructure/exceptions/custom-exceptions/exception.interface';

export class GetPortIdException extends CustomBadRequestException {
  constructor(innerException?: IException) {
    super({
      code: '',
      guid: '09214a19-62f9-4182-856a-410d9b07d8a1',
      objectOrError: 'Error al ejecutar el SP GetPortId',
      innerException: toIException(innerException),
    });
  }
}
