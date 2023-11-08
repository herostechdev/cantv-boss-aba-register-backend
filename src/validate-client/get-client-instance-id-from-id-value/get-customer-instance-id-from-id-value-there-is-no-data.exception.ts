import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';

export class GetCustomerInstanceIdFromIdValueThereIsNoDataException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: 'dd7aa1b3-d52f-4b00-bf67-4ab97020a134',
      objectOrError: 'No hay datos',
    });
  }
}
