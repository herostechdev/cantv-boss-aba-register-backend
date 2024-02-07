import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';

export class ErrorSearchingASAPException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: '973cc0ba-e4ee-498d-b9ba-08b37fbc50c8',
      command: process.env.PIC_GET_ASAP_ORDER_DETAIL_URL,
      objectOrError: 'Error al buscar en ASAP',
    });
  }
}
