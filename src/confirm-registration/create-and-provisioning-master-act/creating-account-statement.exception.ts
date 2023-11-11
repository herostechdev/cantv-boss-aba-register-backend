import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';

export class CreatingAccountStatementException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: 'Error Creando Estado de Cuenta',
      objectOrError: '',
    });
  }
}
