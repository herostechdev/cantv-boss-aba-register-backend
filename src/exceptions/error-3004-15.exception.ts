import { CustomInternalServerException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-internal-server-exception';

export class Error300415Exception extends CustomInternalServerException {
  constructor(command: string) {
    super({
      code: '3004-15',
      guid: '2b70cb0d-25cf-476d-84c3-a0a4b4ca6a8a',
      command: command,
      objectOrError: 'Orden completada – ABA Existe',
    });
  }
}
