import { CustomInternalServerException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-internal-server-exception';

export class Error30101Exception extends CustomInternalServerException {
  constructor(command: string) {
    super({
      code: '3009-2',
      guid: '9619cf77-3a38-4ba2-acbd-5e184c228a41',
      command: command,
      objectOrError:
        'Usuario posee deuda en BOSS asociada al número telefónico que desea registrar',
    });
  }
}
