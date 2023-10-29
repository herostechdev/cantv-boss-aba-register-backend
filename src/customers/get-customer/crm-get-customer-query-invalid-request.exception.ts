import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';

export class CRMGetCustomerInvalidQueryRequestException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: '8a16cd79-8006-46dd-819c-9fd5f98e4a2d',
      objectOrError: 'Error al consumir el servicio del CRM ',
    });
  }
}
