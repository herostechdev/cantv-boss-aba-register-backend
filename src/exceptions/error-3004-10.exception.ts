import { CustomInternalServerException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-internal-server-exception';

export class Error300410Exception extends CustomInternalServerException {
  constructor(command: string) {
    super({
      code: '3004-10',
      guid: '78d40918-0307-456c-a549-be5b6e879daf',
      command: command,
      objectOrError:
        'El número de teléfono no posee un tipo de cliente valido en ASAP',
    });
  }
}
