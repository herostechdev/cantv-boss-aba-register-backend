import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';

export class GetDebtFromCustomerException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: '252ef2d3-e525-4ba9-bbb5-8e33ab2a5938',
      objectOrError: 'Ha ocurrido un error al ejecutar el SP GetDebtFromClient',
    });
  }
}
