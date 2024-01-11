import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';

export class CreatingPaymentInstanceException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: '2daa6a98-efbd-4c10-b2b5-b2f1434626d1',
      objectOrError: 'Error Creando Instancia de Pago',
    });
  }
}
