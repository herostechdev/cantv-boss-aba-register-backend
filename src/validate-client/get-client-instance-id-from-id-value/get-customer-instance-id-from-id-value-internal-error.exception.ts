import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';

export class GetCustomerInstanceIdFromIdValueInternalErrorException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: 'b41498a3-da09-4f59-8a94-be18b9a7def7',
      objectOrError:
        'Ha ocurrido un error al ejecutar el SP GetCltInstanceidFromIdValue',
    });
  }
}
