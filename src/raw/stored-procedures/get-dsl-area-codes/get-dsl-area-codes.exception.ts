import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';
import {
  IException,
  toIException,
} from 'src/system/infrastructure/exceptions/custom-exceptions/exception.interface';

export class GetDSLAreaCodesException extends CustomBadRequestException {
  constructor(innerException?: IException) {
    super({
      code: '',
      guid: '384365fb-5642-48da-b890-dac7d3051577',
      objectOrError: 'Error al ejecutar el SP GETDSLAREACODES',
      innerException: toIException(innerException),
    });
  }
}
