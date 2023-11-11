import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';

export class CreatingSubaccountException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: '32ba9599-ed08-4aba-abd8-dd8d4b47a44e',
      objectOrError: 'Error Creando Subcuenta',
    });
  }
}
