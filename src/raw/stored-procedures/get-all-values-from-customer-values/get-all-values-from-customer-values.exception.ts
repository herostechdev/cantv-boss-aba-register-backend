import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';

export class GetAllValuesFromCustomerValuesException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: '6b45a960-375e-4300-b0eb-533fb991444e',
      objectOrError:
        'Ha ocurrido un error al ejecutar el SP GetAllValuesFromCltvalues',
    });
  }
}
