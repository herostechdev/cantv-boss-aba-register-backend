import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';

export class GetGroupAccessFromLoginThereIsNoDataException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: 'a000352b-74c1-4855-a649-c21026c5bc31',
      objectOrError: 'No hay datos',
    });
  }
}
