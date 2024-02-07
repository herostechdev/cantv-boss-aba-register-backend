import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';

export class CustomerByPhoneNumberInvalidQueryRequestException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: 'dab050fe-8175-4083-9682-dc1559766466',
      command: process.env.PIC_CUSTOMER_BY_PHONE_NUMBER_URL,
      objectOrError:
        'Error al consultar información del cliente por número de teléfono',
    });
  }
}
