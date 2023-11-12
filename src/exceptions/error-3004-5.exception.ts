import { CustomInternalServerException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-internal-server-exception';

export class Error30045Exception extends CustomInternalServerException {
  constructor() {
    super({
      code: '3004-5',
      guid: 'fb9c655e-3d63-4242-a4d9-d4606e64c139',
      objectOrError:
        'No se puede realizar el registro porque la orden ha sido eliminada',
    });
  }
}
