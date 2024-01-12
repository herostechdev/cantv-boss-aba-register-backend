import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';

export class CheckIpPortNotFoundByPhoneNumberException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: '2bd41d95-51b4-4bc2-b2d2-885312839f13',
      objectOrError:
        'No se encontró puerto correspondiente al número telefónico',
    });
  }
}
