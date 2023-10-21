import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';

export class GetValidVPIException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: '8a07225e-017c-4afd-8f30-40326ae0068c',
      objectOrError:
        'Ha ocurrido un error al ejecutar el Stored Procedure GetValidVPI',
    });
  }
}
