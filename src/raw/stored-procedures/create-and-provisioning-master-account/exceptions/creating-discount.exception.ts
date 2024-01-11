import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';

export class CreatingDiscountException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: '3e4d5bd9-c71f-4f3f-b021-dc312d6a011b',
      objectOrError: 'Error Creando Descuento',
    });
  }
}
