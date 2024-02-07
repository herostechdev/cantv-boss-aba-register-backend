import { CustomInternalServerException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-internal-server-exception';

export class Error30046Exception extends CustomInternalServerException {
  constructor(command: string) {
    super({
      code: '3004-6',
      guid: '8137e4ed-cca1-4e12-88ff-9ed751bf3777',
      command: command,
      objectOrError:
        'Por favor verifique su número de teléfono o el número de su orden. Recuerde que la orden es un número que comienza con 99 y tiene 12 dígitos',
    });
  }
}
