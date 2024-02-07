import { CustomInternalServerException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-internal-server-exception';

export class Error30049Exception extends CustomInternalServerException {
  constructor(command: string) {
    super({
      code: '3004-9',
      guid: 'aa27cb8a-2bfd-4c6e-8604-5636c64ce127',
      command: command,
      objectOrError:
        'No se puede realizar el registro porque la orden está en estatus comercial',
    });
  }
}
