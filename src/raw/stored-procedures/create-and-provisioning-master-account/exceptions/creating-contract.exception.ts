import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';

export class CreatingContractException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: '55ccb0b0-bb6e-41d6-ab8b-280d825c614c',
      objectOrError: 'Error Creando Contrato',
    });
  }
}
