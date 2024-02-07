import { CustomInternalServerException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-internal-server-exception';

export class Error10022Exception extends CustomInternalServerException {
  constructor(command: string) {
    super({
      code: '1002-2',
      guid: '67865c25-294a-43e2-b9e3-e2b9ab9cf54b',
      command: command,
      objectOrError:
        'El usuario ingresa un carácter especial en los formularios de la página de registro',
    });
  }
}
