import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';

export class ASAPOrderStateIsInvalidException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: '1fba5721-f1b2-40c0-99e9-bdc2935d98b4',
      command: process.env.PIC_GET_ASAP_ORDER_DETAIL_URL,
      objectOrError: 'El estado de la orden en ASAP es inválido',
    });
  }
}
