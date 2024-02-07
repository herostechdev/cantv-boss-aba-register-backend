import { CustomInternalServerException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-internal-server-exception';

export class Error1002Exception extends CustomInternalServerException {
  constructor(command: string) {
    super({
      code: '1003',
      guid: '15fd4c07-a505-434d-9f67-1d1d2a0a0c59',
      command: command,
      objectOrError: 'Error Administrativo 1002',
    });
  }
}
