import { CustomInternalServerException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-internal-server-exception';

export class Error30044Exception extends CustomInternalServerException {
  constructor() {
    super({
      code: '3004-4',
      guid: '19e8e693-0b71-4abb-a22f-6889a2ac3e28',
      objectOrError:
        'La orden de servicio no tiene el estatus adecuado para efectuar el registro',
    });
  }
}
