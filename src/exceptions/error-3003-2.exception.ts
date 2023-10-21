import { CustomInternalServerException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-internal-server-exception';

export class Error30032Exception extends CustomInternalServerException {
  constructor() {
    super({
      code: '3003-2',
      guid: 'f4495c9f-f821-48e2-82ca-efed637ff618',
      objectOrError: 'No se encontró puerto según el parámetro correspondiente',
    });
  }
}
