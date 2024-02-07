import { CustomInternalServerException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-internal-server-exception';

export class Error30043Exception extends CustomInternalServerException {
  constructor(command: string) {
    super({
      code: '3004-3',
      guid: 'b2ab1c7d-f298-4052-8a1a-323eb677b525',
      command: command,
      objectOrError:
        'No hay datos del DSLAM dado el Puerto en BOSS – Error 3004-3: La orden no esta en BOSS y ASAP devuelve error',
    });
  }
}
