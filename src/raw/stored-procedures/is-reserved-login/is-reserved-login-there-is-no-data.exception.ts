import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';
import { toIException } from 'src/system/infrastructure/exceptions/custom-exceptions/exception.interface';

export class IsReservedLoginThereIsNoDataException extends CustomBadRequestException {
  constructor(innerException?: any) {
    super({
      code: '',
      guid: 'f0ee155f-d247-4dee-b408-955c2cc04e92',
      objectOrError: 'No hay datos',
      innerException: toIException(innerException),
    });
  }
}
