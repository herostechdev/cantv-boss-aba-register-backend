import { CustomInternalServerException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-internal-server-exception';

export class Error10024Exception extends CustomInternalServerException {
  constructor(command: string) {
    super({
      code: '1002-4',
      guid: '46261b79-d208-419d-857f-6f21447c3236',
      command: command,
      objectOrError: 'Error 1002-4',
    });
  }
}
