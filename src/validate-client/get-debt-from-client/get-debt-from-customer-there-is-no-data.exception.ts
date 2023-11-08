import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';

export class GetDebtFromCustomerThereIsNoDataException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: '2aa2b4d5-168e-4a11-a1b2-ce508281d2bd',
      objectOrError: 'No hay datos',
    });
  }
}
