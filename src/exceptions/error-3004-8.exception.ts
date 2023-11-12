import { CustomInternalServerException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-internal-server-exception';

export class Error30048Exception extends CustomInternalServerException {
  constructor() {
    super({
      code: '3004-8',
      guid: '',
      objectOrError: 'El número de teléfono no existe',
    });
  }
}
