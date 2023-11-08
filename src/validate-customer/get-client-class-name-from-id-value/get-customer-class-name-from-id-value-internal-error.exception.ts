import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';

export class GetCustomerClassNameFromIdValueInternalErrorException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: 'f6d6d3ba-d7d0-4cbe-8317-394e6c11bc60',
      objectOrError:
        'Ha ocurrido un error al ejecutar el SP GetCltClassNameFromIdValue',
    });
  }
}
