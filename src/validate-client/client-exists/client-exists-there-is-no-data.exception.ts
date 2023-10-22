import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';

export class ClientExistsThereIsNoDataException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: '3d281ea5-b4c4-4654-87d3-d347500d00e6',
      objectOrError: 'No hay datos',
    });
  }
}
