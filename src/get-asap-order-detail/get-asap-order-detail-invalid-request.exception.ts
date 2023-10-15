import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';

export class GetASAPOrderDetailInvalidQueryRequestException extends CustomBadRequestException {
  constructor() {
    super({
      code: 'UNKNOWN',
      guid: '3adb79a4-decc-4bfa-b098-ef8709e5ad52',
      descriptionOrOptions: 'La ordén es inválida',
    });
  }
}
