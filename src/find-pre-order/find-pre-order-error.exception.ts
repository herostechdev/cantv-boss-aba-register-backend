import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';

export class FindPreOrderErrorException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: '1b2f2723-8c90-4374-8c3e-67b50959afe3',
      objectOrError:
        'Ha ocurrido un error al ejecutar el SP GetOrderidFromAbaSales',
    });
  }
}
