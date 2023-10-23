import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';

export class IsReservedLoginThereIsNoDataException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: 'f0ee155f-d247-4dee-b408-955c2cc04e92',
      objectOrError: 'No hay datos',
    });
  }
}
