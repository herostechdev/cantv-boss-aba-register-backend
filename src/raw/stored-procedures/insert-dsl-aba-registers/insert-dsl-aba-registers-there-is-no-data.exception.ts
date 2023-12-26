import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';

export class InsertDslAbaRegisterThereIsNoDataException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: '03a218e9-1484-497c-ac44-85305efa6037',
      objectOrError: 'No se encontraron datos',
    });
  }
}
