import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';

export class InsertModifyCustomerAttributeInternalErrorException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: '7c5579d9-afce-4422-8baf-c65224fd9ead',
      objectOrError:
        'Ha ocurrido un error al ejecutar el SP InsertModifyCltAttribute',
    });
  }
}
