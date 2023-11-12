import { CustomInternalServerException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-internal-server-exception';

export class Error30042Exception extends CustomInternalServerException {
  constructor() {
    super({
      code: '3004-1',
      guid: 'f5fe3d39-9390-49dd-860c-1f43e2544c2c',
      objectOrError:
        'Su teléfono se encuentra en gestión de cobranza o suspendido',
    });
  }
}
